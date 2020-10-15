"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
var Timer = /** @class */ (function () {
    function Timer(_duration) {
        this._duration = _duration;
        this._started = false;
        this._paused = false;
        this._startTime = 0;
        this._pauseTime = 0;
        this._totalPausedTime = 0;
        this._started = false;
        this._paused = false;
        this._startTime = 0;
        this._pauseTime = 0;
        this._interval = 0;
    }
    Object.defineProperty(Timer.prototype, "timeRemaining", {
        get: function () {
            if (this._started) {
                if (this._paused) {
                    return this._duration - (this._pauseTime - this._startTime - this._totalPausedTime);
                }
                else {
                    return this._duration - (this.getTime() - this._startTime - this._totalPausedTime);
                }
            }
            return this._duration;
        },
        enumerable: false,
        configurable: true
    });
    Timer.prototype.start = function () {
        if (!this._started) {
            this._started = true;
            this._startTime = this.getTime();
            this.startIntervalCallback();
            this.startTimeoutCallback();
        }
    };
    Timer.prototype.stop = function () {
        if (this._started) {
            this._started = false;
            this._startTime = 0;
            this._paused = false;
            this._pauseTime = 0;
            this._totalPausedTime = 0;
            this.clearIntervalCallback();
            this.clearTimeoutCallback();
        }
    };
    Timer.prototype.pause = function () {
        if (this._started && !this._paused) {
            this._paused = true;
            this._pauseTime = this.getTime();
            this.clearIntervalCallback();
            this.clearTimeoutCallback();
        }
    };
    Timer.prototype.resume = function () {
        if (this._started && this._paused) {
            this._totalPausedTime += (this.getTime() - this._pauseTime);
            this._paused = false;
            this._pauseTime = 0;
        }
        this.startIntervalCallback();
        this.startTimeoutCallback();
    };
    Timer.prototype.setIntervalCallback = function (callback, interval) {
        this._interval = interval;
        this._intervalCallback = callback;
        if (this._intervalCallbackHandle) {
            clearInterval(this._intervalCallbackHandle);
            this._intervalCallbackHandle = undefined;
        }
    };
    Timer.prototype.setTimeoutCallback = function (callback) {
        this._timeoutCallback = callback;
        if (this._timeoutCallbackHandle) {
            clearInterval(this._timeoutCallbackHandle);
            this._timeoutCallbackHandle = undefined;
        }
    };
    Timer.prototype.startIntervalCallback = function () {
        var _this = this;
        var interval = this._interval ? this._interval : 100;
        if (this._intervalCallback) {
            this._intervalCallbackHandle = setInterval(function () {
                if (_this.timeRemaining > 0) {
                    _this._intervalCallback();
                }
                else {
                    if (_this._intervalCallbackHandle) {
                        clearInterval(_this._intervalCallbackHandle);
                        _this._intervalCallbackHandle = undefined;
                    }
                }
            }, interval);
        }
    };
    Timer.prototype.startTimeoutCallback = function () {
        var _this = this;
        if (this._timeoutCallback) {
            this._timeoutCallbackHandle = setTimeout(function () {
                _this._timeoutCallback();
                if (_this._timeoutCallbackHandle) {
                    clearTimeout(_this._timeoutCallbackHandle);
                    _this._timeoutCallbackHandle = undefined;
                }
            }, this.timeRemaining);
        }
    };
    Timer.prototype.clearIntervalCallback = function () {
        if (this._intervalCallbackHandle) {
            clearInterval(this._intervalCallbackHandle);
            this._intervalCallbackHandle = undefined;
        }
    };
    Timer.prototype.clearTimeoutCallback = function () {
        if (this._timeoutCallbackHandle) {
            clearTimeout(this._timeoutCallbackHandle);
            this._timeoutCallbackHandle = undefined;
        }
    };
    Timer.prototype.clearCallbacks = function () {
        if (this._intervalCallbackHandle) {
            clearInterval(this._intervalCallbackHandle);
            this._intervalCallbackHandle = undefined;
        }
        if (this._timeoutCallbackHandle) {
            clearTimeout(this._timeoutCallbackHandle);
            this._timeoutCallbackHandle = undefined;
        }
        this._intervalCallback = undefined;
        this._timeoutCallback = undefined;
        this._interval = 0;
    };
    Timer.prototype.getTime = function () {
        return new Date().getTime();
    };
    return Timer;
}());
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map