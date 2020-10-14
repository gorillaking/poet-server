import { Player } from "./player";

export class LeaveResult{
  public hasPlayerLeft: boolean = false;
  public playerLeft: Player | undefined;
  public hostChanged: boolean = false;
  public newHost: Player | undefined;
  public hasTurnAdvanced: boolean = false;
  public hasGameEnded: boolean = false;

  constructor(public gameId: string, public playerCount: number){}
}