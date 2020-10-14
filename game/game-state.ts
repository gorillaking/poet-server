import { Player } from "./player";

export class GameState{
  constructor(
    public isPlaying: boolean,
    public isPaused: boolean,
    public isTurnStarted: boolean,
    public turnOrder: (Player | undefined)[],
    public currentTurn: number,
    public currentTurnPlayer: Player,
    public hasPoint1Assigned: boolean,
    public hasPoint3Assigned: boolean,
    public scores: { [key: string]: number }
  ){}
}