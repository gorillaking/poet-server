export class Room {
  constructor(
    public name: string,
    public playerCount: number,
    public turnCount: number,
    public turnDuration: number
  ) {}
}