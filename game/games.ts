import { Game } from "./game";
import { LobbyInfo } from "./lobby-info";
import { Player } from "./player";
import { Room } from "./room";

export class Games{
  private _games: Game[] = [];

  constructor(private _maxGames: number) {}

  createGame(room: Room, player: Player): string {
    if(this._games.length >= this._maxGames) {
      throw new Error('Maximum number of game room has reached.');
    }

    let game = new Game(room, player);
    this._games.push(game)
    return game.id;
  }

  find(id: string): Game | undefined {
    return this._games.find(g => g.id === id);
  }

  joinGame(gameId: string, player: Player): void {
    let game = this.find(gameId);
    if(!game) {
      throw new Error('Game does not exist.');
    }

    game.join(player);
  }

  get lobbyInfo(): LobbyInfo[]{
    return this._games.map(g => g.lobbyInfo);
  }
}