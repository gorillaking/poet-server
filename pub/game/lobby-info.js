"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyInfo = void 0;
var LobbyInfo = /** @class */ (function () {
    function LobbyInfo(id, name, playerCount, seatedPlayers, turnCount, turnDuration, isPlaying) {
        this.id = id;
        this.name = name;
        this.playerCount = playerCount;
        this.seatedPlayers = seatedPlayers;
        this.turnCount = turnCount;
        this.turnDuration = turnDuration;
        this.isPlaying = isPlaying;
    }
    return LobbyInfo;
}());
exports.LobbyInfo = LobbyInfo;
//# sourceMappingURL=lobby-info.js.map