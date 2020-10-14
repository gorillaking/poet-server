import { Card } from "./card";
import { CardRepository } from "./card-repository";
import { GameMetadata } from "./game-metadata";
import { GameState } from "./game-state";
import { LeaveResult } from "./leave-result";
import { LobbyInfo } from "./lobby-info";
import { NoRepeatRandomizer } from "./no-repeat-randomizer";
import { Player } from "./player";
import { Room } from "./room";
import { Timer } from "./timer";

export class Game{
  private _id: string;
  private _host: string;
  private _isPlaying: boolean = false;
  private _players: Player[] = [];
  private _cardRandomizer: NoRepeatRandomizer;
  
  //state after game start
  private _turnOrder: number[] = [];
  private _currentTurnPlayer: number = 0;
  private _currentTurn: number = 0;
  private _scores: { [key: string]: number };

  //state after turn start
  private _1pointAssigned: boolean = false;
  private _3pointsAssigned: boolean = false;
  private _isPaused: boolean = false;
  private _isTurnStarted: boolean = false;
  private _currentCard: Card | undefined;
  private _timer: Timer;

  get id(): string { return this._id }

  get lobbyInfo(): LobbyInfo {
    return new LobbyInfo(this._id,
      this._room.name,
      this._room.playerCount,
      this._players.length,
      this._room.turnCount,
      this._room.turnDuration,
      this._isPlaying);
  }

  get metadata(): GameMetadata {
    return new GameMetadata(this._id,
      this._room.name,
      this.players.find(p => p.id == this._host) || new Player('', ''),
      this._room.playerCount,
      this._room.turnCount,
      this._room.turnDuration);
  }

  get state(): GameState {
    return new GameState(this._isPlaying,
      this._isPaused,
      this._isTurnStarted,
      this._turnOrder.map(o => { return (o !== -1 ? this._players[o] : undefined) }),
      this._currentTurn,
      this.getCurrentTurnPlayer(),
      this._1pointAssigned,
      this._3pointsAssigned,
      this._scores); 
  }

  get players(): Player[]{
    return this._players;
  }

  get timeRemaining(): number{
    return this._timer.timeRemaining;
  } 

  get currentCard(): Card | undefined{
    return this._currentCard;
  }

  constructor(
    private _room: Room,
    host: Player,
    cardRepository: CardRepository
  ) {
    this._id = this.generateRandomId();
    this._host = host.id;
    this._cardRandomizer = new NoRepeatRandomizer(cardRepository);
    this._timer = new Timer(this._room.turnDuration);
    this._scores = {};
  }

  start(playerId: string): void {
    if(this._isPlaying) {
      return;
    }

    if(playerId !== this._host) {
      throw new Error('Only the host can start the game.');
    }

    this._turnOrder = this.getRandomizedOrder(this._players.length);
    this._isPlaying = true;
    this._currentTurnPlayer = 0;
    this._currentTurn = 1;
    this._players.forEach(player => {
      this._scores[player.id] = 0;
    });
  }

  startTurn(playerId: string): Card {
    if(!this._isPlaying) {
      throw new Error('Game has not started by the host yet.');
    }

    if(this._isTurnStarted) {
      throw new Error('Turn has already started.');
    }

    let currentTurnPlayer = this.getCurrentTurnPlayer();
    if(currentTurnPlayer.id !== playerId) {
      throw new Error('You are not allow to start the turn.');
    }

    this._isTurnStarted = true;
    this._currentCard = this._cardRandomizer.getNext();
    this._1pointAssigned = false;
    this._3pointsAssigned = false;
    this._timer.start();

    return this._currentCard;
  }

  stopTurn(playerId: string): string {
    if(!this._isPlaying) {
      throw new Error('Game has not started by the host yet.');
    }

    let currentTurnPlayer = this.getCurrentTurnPlayer();
    if(playerId !== currentTurnPlayer.id) {
      throw new Error('Only current turn player can end the turn.');
    }

    return this.advanceTurn();
  }

  assignPoint(playerId: string, receivingPlayerId: string, points: number): string {
    if(!this._isPlaying) {
      throw new Error('Game has not started by the host yet.');
    }

    let currentTurnPlayer = this.getCurrentTurnPlayer();
    if(playerId !== currentTurnPlayer.id) {
      throw new Error('Only current turn player can assign score.');
    }

    let receivingPlayer = this._players.find(p => p.id === receivingPlayerId);
    if(!receivingPlayer){
      throw new Error('Receiving player does not exist.');
    }

    if(points !== 1 && points !== 3) {
      throw new Error('Invalid point value.');
    }

    if(this._1pointAssigned && points === 1) {
      throw new Error('Point value 1 has already been assigned.');
    }

    if(this._3pointsAssigned && points === 3) {
      throw new Error('Point value 3 has already been assigned.');
    }

    if(points === 1) {
      this._1pointAssigned = true;
      this._scores[receivingPlayerId] += 1;
      this._scores[playerId] += 1;
    }

    if(points === 3) {
      this._1pointAssigned = true; 
      this._3pointsAssigned = true;
      if(!this._1pointAssigned) {
        this._scores[receivingPlayerId] += 4;
        this._scores[playerId] += 4;
      } else {
        this._scores[receivingPlayerId] += 3;
        this._scores[playerId] += 3;
      }
    }

    if(this._1pointAssigned && this._3pointsAssigned) {
      return this.stopTurn(playerId);
    }

    return 'point-assigned';
  }

  deductPoint(playerId: string, points: number): string {
    if(!this._isPlaying) {
      throw new Error('Game has not started by the host yet.');
    }

    let currentTurnPlayer = this.getCurrentTurnPlayer();
    if(playerId !== currentTurnPlayer.id) {
      throw new Error('Only current turn player can deduct score.');
    }

    if(points !== 1) {
      throw new Error('Invalid point value.');
    }

    this._scores[playerId] -= 1;
    this._scores[playerId] = Math.max(this._scores[playerId], 0);

    return this.stopTurn(playerId);
  }

  private advanceTurn(): string {
    this._timer.stop();
    this._isPaused = false;
    this._isTurnStarted = false;

    let nextTurnPlayer = this._currentTurnPlayer;
    let nextTurn = this._currentTurn;
    do {
      nextTurn = ((this._currentTurnPlayer + 1) === this._turnOrder.length) ? this._currentTurn + 1 : this._currentTurn;
      nextTurnPlayer = (this._currentTurnPlayer + 1) % this._turnOrder.length;

      if(nextTurn > this._room.turnCount) {
        return 'end-game';
      }
    } while (this._turnOrder[nextTurnPlayer] === -1);

    this._currentTurnPlayer = nextTurnPlayer;
    this._currentTurn = nextTurn;

    this._isPaused = false;
    this._isTurnStarted = false;

    return 'player-changed';
  }

  reset(): void {
    this._timer.stop();
    this._isPlaying = false;
    this._isPaused = false;
    this._isTurnStarted = false;
    this._turnOrder = [];
    this._cardRandomizer.reset();
    this._currentTurnPlayer = -1;
    this._currentTurn = 0;
    this._currentCard = undefined;
    this._scores = {}
    this._1pointAssigned = false;
    this._3pointsAssigned = false;
  }

  pause(playerId: string): void {
    if(this._isPlaying && this._isTurnStarted && !this._isPaused) {
      let currentTurnPlayer = this.getCurrentTurnPlayer();
      if(playerId === currentTurnPlayer.id){
        this._timer.pause();
        this._isPaused = true;
      }
    }
  }

  resume(playerId: string): void {
    if(this._isPlaying && this._isTurnStarted && this._isPaused) {
      let currentTurnPlayer = this.getCurrentTurnPlayer();
      if(playerId === currentTurnPlayer.id){
        this._timer.resume();
        this._isPaused = false;
      }
    }
  }

  getCurrentTurnPlayer(): Player{
    if(!this._isPlaying){
      return new Player('', '');
    }
    return this._players[this._turnOrder[this._currentTurnPlayer]];
  }

  join(player: Player): void{
    if(this._isPlaying) {
      throw new Error('Game has been started');
    }

    let findPlayer = this._players.find(p => p.id === player.id);
    if(!findPlayer) {
      this._players.push(player);
    }
  }

  leave(playerId: string): LeaveResult{
    let result = new LeaveResult(this._id, this._players.length);
    let playerIndex = this._players.findIndex(p => p.id === playerId);
    if(playerIndex !== -1) {
      let removedPlayer = this._players.splice(playerIndex, 1)[0];
      result.hasPlayerLeft = true;
      result.playerLeft = removedPlayer;
      result.playerCount = this._players.length;

      if(this._isPlaying) {
        if(this._players.length > 1) {
          this._turnOrder[this._currentTurnPlayer] = -1;
          for(let i = 0; i < this._turnOrder.length; i++){
            if(this._turnOrder[i] > playerIndex) {
              this._turnOrder[i]--;
            }
          }

          if(this._turnOrder[this._currentTurnPlayer] === playerIndex){
            let change = this.advanceTurn();
            if(change === 'end-game') {
              result.hasGameEnded = true;
            } else {
              result.hasTurnAdvanced = true;
            }
          }
        } else if (this._players.length === 1) {
          result.hasGameEnded = true;
          result.hostChanged = true;
          result.newHost = this._players[0];
        }
      }

      if(this._host === removedPlayer.id && this.players.length > 0){
        let newHost = this._players[Math.floor(Math.random() * this._players.length)];
        this._host = newHost.id;
        result.hostChanged = true;
        result.newHost = newHost;
      }
    } else {
      result.playerCount = this._players.length;
    }

    return result;
  }

  setCallback(intervalCallback: any, interval: number, timeoutCallback: any): void {
    this._timer.setIntervalCallback(intervalCallback, interval);
    this._timer.setTimeoutCallback(timeoutCallback);
  }

  private generateRandomId(): string {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  private getRandomizedOrder(count: number): number[] {
    let range = Array.from(Array(count).keys());
    let randomOrder = [];
    while(range.length) {
      let randomIndex = Math.floor(Math.random() * range.length);
      let val = range[randomIndex];
      range.splice(randomIndex, 1);
      randomOrder.push(val);
    }

    return randomOrder;
  }
}