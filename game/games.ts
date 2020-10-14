import { CardRepository } from "./card-repository";
import { Game } from "./game";
import { LeaveResult } from "./leave-result";
import { LobbyInfo } from "./lobby-info";
import { Player } from "./player";
import { Room } from "./room";

export class Games{
  private _games: Game[] = [];
  private _playerRoomMap: Map<string, string> = new Map<string, string>();
  private _cardRepository: CardRepository = new CardRepository();

  constructor(private _maxGames: number) {}

  createGame(room: Room, player: Player): string {
    if(this._games.length >= this._maxGames) {
      throw new Error('Maximum number of game room has reached.');
    }

    let game = new Game(room, player, this._cardRepository);
    this._games.push(game)
    return game.id;
  }

  find(id: string): Game | undefined {
    return this._games.find(g => g.id === id);
  }

  findGameOfPlayer(playerId: string): Game | undefined {
    if(this._playerRoomMap.has(playerId)) {
      let gameId = this._playerRoomMap.get(playerId);
      if(gameId) {
        return this.find(gameId);
      }
    }
    
    return undefined;
  }

  joinGame(gameId: string, player: Player): void {
    if(player.id in this._playerRoomMap && this._playerRoomMap.get(player.id) != gameId) {
      throw new Error('Player is already in another game.');
    }

    let game = this.find(gameId);
    if(!game) {
      throw new Error('Game does not exist.');
    }
    game.join(player);
    this._playerRoomMap.set(player.id, gameId);
  }

  get lobbyInfo(): LobbyInfo[]{
    return this._games.map(g => g.lobbyInfo);
  }

  leaveGame(playerId: string): LeaveResult | undefined {
    let game = this.findGameOfPlayer(playerId);
    if(game) {
      let result = game.leave(playerId);
      if(result.hasPlayerLeft){
        this._playerRoomMap.delete(playerId);
      }

      if(result.playerCount === 0) {
        let gameIndex = this._games.findIndex(g => g.id === result.gameId)
        if(gameIndex !== -1) {
          this._games.splice(gameIndex, 1);
        }
      }

      return result;
    }

    return undefined;
  }
}