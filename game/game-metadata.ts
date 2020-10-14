import { Player } from "./player";

export class GameMetadata{
  constructor(
    public id: string,
    public name: string,
    public host: Player,
    public players: number,
    public turns: number,
    public duration: number
  ) {}
}