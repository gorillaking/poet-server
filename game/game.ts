import { LobbyInfo } from "./lobby-info";
import { Player } from "./player";
import { Room } from "./room";

export class Game{
  private _id: string;
  private _host: string;
  private _isPlaying: boolean = false;
  private _isPaused: boolean = false;
  private _isTurnStarted: boolean = false;
  private _players: Player[] = [];

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

  constructor(
    private _room: Room,
    host: Player
  ) {
    this._host = host.id;
    this._id = this.generateRandomId();
  }

  join(player: Player): void{
    if(this._isPlaying) {
      throw new Error('Game has been started');
    }

    let findPlayer = this._players.find(p => p.id === player.id);
    if(findPlayer) {
      throw new Error('Player has been seated');
    }

    this._players.push(player);
  }

  private generateRandomId(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}