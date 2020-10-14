export class Timer{
  private _started: boolean = false;
  private _paused: boolean = false;
  private _startTime: number = 0;
  private _pauseTime: number = 0;
  private _totalPausedTime: number = 0;
  private _interval: number;

  private _intervalCallbackHandle: NodeJS.Timeout | undefined;
  private _timeoutCallbackHandle: NodeJS.Timeout | undefined;

  private _intervalCallback: any;
  private _timeoutCallback: any;

  get timeRemaining(): number {
    if(this._started) {
      if(this._paused) {
        return this._duration - (this._pauseTime - this._startTime - this._totalPausedTime);
      } else {
        return this._duration - (this.getTime() - this._startTime - this._totalPausedTime);
      }
    }

    return this._duration;
  }

  constructor(private _duration: number) {
      this._started = false;
      this._paused = false;
      this._startTime = 0;
      this._pauseTime = 0;
      this._interval = 0;
  }

  start(): void{
    if(!this._started) {
      this._started = true;
      this._startTime = this.getTime();

      this.startIntervalCallback();
      this.startTimeoutCallback();
    }
  }

  stop(): void{
    if(this._started){
      this._started = false;
      this._startTime = 0;
      this._paused = false;
      this._pauseTime = 0;
      this._totalPausedTime = 0;

      this.clearIntervalCallback();
      this.clearTimeoutCallback();
    }
  }

  pause(): void{
    if(this._started && !this._paused){
      this._paused = true;
      this._pauseTime = this.getTime();

      this.clearIntervalCallback();
      this.clearTimeoutCallback();
    }
  }

  resume(): void{
    if(this._started && this._paused) {
      this._totalPausedTime += (this.getTime() - this._pauseTime);
      this._paused = false;
      this._pauseTime = 0;
    }

    this.startIntervalCallback();
    this.startTimeoutCallback();
  }

  setIntervalCallback(callback: ()=>void, interval: number): void {
    this._interval = interval;
    this._intervalCallback = callback;
    if(this._intervalCallbackHandle){
      clearInterval(this._intervalCallbackHandle);
      this._intervalCallbackHandle = undefined;
    }
  }

  setTimeoutCallback(callback: ()=>void) {
    this._timeoutCallback = callback;
    if(this._timeoutCallbackHandle){
      clearInterval(this._timeoutCallbackHandle);
      this._timeoutCallbackHandle = undefined;
    }
  }

  private startIntervalCallback(){
    let interval = this._interval ? this._interval : 100;
    if(this._intervalCallback){
        this._intervalCallbackHandle = setInterval(() => {
        if(this.timeRemaining > 0) {
          this._intervalCallback();
        } else {
          if(this._intervalCallbackHandle) {
            clearInterval(this._intervalCallbackHandle);
            this._intervalCallbackHandle = undefined;
          }
        }
      }, interval);
    }
  }

  private startTimeoutCallback(){
    if(this._timeoutCallback){
        this._timeoutCallbackHandle = setTimeout(() => {
        this._timeoutCallback();
        if(this._timeoutCallbackHandle){
          clearTimeout(this._timeoutCallbackHandle);
          this._timeoutCallbackHandle = undefined;
        }
      }, this.timeRemaining);
    }
  }

  private clearIntervalCallback(){
    if(this._intervalCallbackHandle) {
      clearInterval(this._intervalCallbackHandle);
      this._intervalCallbackHandle = undefined;
    }
  }

  private clearTimeoutCallback(){
    if(this._timeoutCallbackHandle){
      clearTimeout(this._timeoutCallbackHandle);
      this._timeoutCallbackHandle = undefined;
    }
  }

  clearCallbacks() {
    if(this._intervalCallbackHandle){
      clearInterval(this._intervalCallbackHandle);
      this._intervalCallbackHandle = undefined;
    }

    if(this._timeoutCallbackHandle){
      clearTimeout(this._timeoutCallbackHandle);
      this._timeoutCallbackHandle = undefined;
    }

    this._intervalCallback = undefined;
    this._timeoutCallback = undefined;

    this._interval = 0;
  }

  private getTime(){
    return new Date().getTime();
  }
}