"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
var GameState = /** @class */ (function () {
    function GameState(isPlaying, isPaused, isTurnStarted, turnOrder, currentTurn, currentTurnPlayer, hasPoint1Assigned, hasPoint3Assigned, scores) {
        this.isPlaying = isPlaying;
        this.isPaused = isPaused;
        this.isTurnStarted = isTurnStarted;
        this.turnOrder = turnOrder;
        this.currentTurn = currentTurn;
        this.currentTurnPlayer = currentTurnPlayer;
        this.hasPoint1Assigned = hasPoint1Assigned;
        this.hasPoint3Assigned = hasPoint3Assigned;
        this.scores = scores;
    }
    return GameState;
}());
exports.GameState = GameState;
//# sourceMappingURL=game-state.js.map