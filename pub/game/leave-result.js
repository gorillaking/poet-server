"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveResult = void 0;
var LeaveResult = /** @class */ (function () {
    function LeaveResult(gameId, playerCount) {
        this.gameId = gameId;
        this.playerCount = playerCount;
        this.hasPlayerLeft = false;
        this.hostChanged = false;
        this.hasTurnAdvanced = false;
        this.hasGameEnded = false;
    }
    return LeaveResult;
}());
exports.LeaveResult = LeaveResult;
//# sourceMappingURL=leave-result.js.map