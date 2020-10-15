"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Games = void 0;
var card_repository_1 = require("./card-repository");
var game_1 = require("./game");
var Games = /** @class */ (function () {
    function Games(_maxGames) {
        this._maxGames = _maxGames;
        this._games = [];
        this._playerRoomMap = new Map();
        this._cardRepository = new card_repository_1.CardRepository();
    }
    Games.prototype.createGame = function (room, player) {
        if (this._games.length >= this._maxGames) {
            throw new Error('Maximum number of game room has reached.');
        }
        var game = new game_1.Game(room, player, this._cardRepository);
        this._games.push(game);
        return game.id;
    };
    Games.prototype.find = function (id) {
        return this._games.find(function (g) { return g.id === id; });
    };
    Games.prototype.findGameOfPlayer = function (playerId) {
        if (this._playerRoomMap.has(playerId)) {
            var gameId = this._playerRoomMap.get(playerId);
            if (gameId) {
                return this.find(gameId);
            }
        }
        return undefined;
    };
    Games.prototype.joinGame = function (gameId, player) {
        if (player.id in this._playerRoomMap && this._playerRoomMap.get(player.id) != gameId) {
            throw new Error('Player is already in another game.');
        }
        var game = this.find(gameId);
        if (!game) {
            throw new Error('Game does not exist.');
        }
        game.join(player);
        this._playerRoomMap.set(player.id, gameId);
    };
    Object.defineProperty(Games.prototype, "lobbyInfo", {
        get: function () {
            return this._games.map(function (g) { return g.lobbyInfo; });
        },
        enumerable: false,
        configurable: true
    });
    Games.prototype.leaveGame = function (playerId) {
        var game = this.findGameOfPlayer(playerId);
        if (game) {
            var result_1 = game.leave(playerId);
            if (result_1.hasPlayerLeft) {
                this._playerRoomMap.delete(playerId);
            }
            if (result_1.playerCount === 0) {
                var gameIndex = this._games.findIndex(function (g) { return g.id === result_1.gameId; });
                if (gameIndex !== -1) {
                    this._games.splice(gameIndex, 1);
                }
            }
            return result_1;
        }
        return undefined;
    };
    return Games;
}());
exports.Games = Games;
//# sourceMappingURL=games.js.map