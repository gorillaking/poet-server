"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var game_metadata_1 = require("./game-metadata");
var game_state_1 = require("./game-state");
var leave_result_1 = require("./leave-result");
var lobby_info_1 = require("./lobby-info");
var no_repeat_randomizer_1 = require("./no-repeat-randomizer");
var player_1 = require("./player");
var timer_1 = require("./timer");
var Game = /** @class */ (function () {
    function Game(_room, host, cardRepository) {
        this._room = _room;
        this._isPlaying = false;
        this._players = [];
        //state after game start
        this._turnOrder = [];
        this._currentTurnPlayer = 0;
        this._currentTurn = 0;
        //state after turn start
        this._1pointAssigned = false;
        this._3pointsAssigned = false;
        this._isPaused = false;
        this._isTurnStarted = false;
        this._id = this.generateRandomId();
        this._host = host.id;
        this._cardRandomizer = new no_repeat_randomizer_1.NoRepeatRandomizer(cardRepository);
        this._timer = new timer_1.Timer(this._room.turnDuration);
        this._scores = {};
    }
    Object.defineProperty(Game.prototype, "id", {
        get: function () { return this._id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "lobbyInfo", {
        get: function () {
            return new lobby_info_1.LobbyInfo(this._id, this._room.name, this._room.playerCount, this._players.length, this._room.turnCount, this._room.turnDuration, this._isPlaying);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "metadata", {
        get: function () {
            var _this = this;
            return new game_metadata_1.GameMetadata(this._id, this._room.name, this.players.find(function (p) { return p.id == _this._host; }) || new player_1.Player('', ''), this._room.playerCount, this._room.turnCount, this._room.turnDuration);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "state", {
        get: function () {
            var _this = this;
            return new game_state_1.GameState(this._isPlaying, this._isPaused, this._isTurnStarted, this._turnOrder.map(function (o) { return (o !== -1 ? _this._players[o] : undefined); }), this._currentTurn, this.getCurrentTurnPlayer(), this._1pointAssigned, this._3pointsAssigned, this._scores);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "players", {
        get: function () {
            return this._players;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "timeRemaining", {
        get: function () {
            return this._timer.timeRemaining;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentCard", {
        get: function () {
            return this._currentCard;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.start = function (playerId) {
        var _this = this;
        if (this._isPlaying) {
            return;
        }
        if (playerId !== this._host) {
            throw new Error('Only the host can start the game.');
        }
        this._turnOrder = this.getRandomizedOrder(this._players.length);
        this._isPlaying = true;
        this._currentTurnPlayer = 0;
        this._currentTurn = 1;
        this._players.forEach(function (player) {
            _this._scores[player.id] = 0;
        });
    };
    Game.prototype.startTurn = function (playerId) {
        if (!this._isPlaying) {
            throw new Error('Game has not started by the host yet.');
        }
        if (this._isTurnStarted) {
            throw new Error('Turn has already started.');
        }
        var currentTurnPlayer = this.getCurrentTurnPlayer();
        if (currentTurnPlayer.id !== playerId) {
            throw new Error('You are not allow to start the turn.');
        }
        this._isTurnStarted = true;
        this._currentCard = this._cardRandomizer.getNext();
        this._1pointAssigned = false;
        this._3pointsAssigned = false;
        this._timer.start();
        return this._currentCard;
    };
    Game.prototype.stopTurn = function (playerId) {
        if (!this._isPlaying) {
            throw new Error('Game has not started by the host yet.');
        }
        var currentTurnPlayer = this.getCurrentTurnPlayer();
        if (playerId !== currentTurnPlayer.id) {
            throw new Error('Only current turn player can end the turn.');
        }
        return this.advanceTurn();
    };
    Game.prototype.assignPoint = function (playerId, receivingPlayerId, points) {
        if (!this._isPlaying) {
            throw new Error('Game has not started by the host yet.');
        }
        var currentTurnPlayer = this.getCurrentTurnPlayer();
        if (playerId !== currentTurnPlayer.id) {
            throw new Error('Only current turn player can assign score.');
        }
        var receivingPlayer = this._players.find(function (p) { return p.id === receivingPlayerId; });
        if (!receivingPlayer) {
            throw new Error('Receiving player does not exist.');
        }
        if (points !== 1 && points !== 3) {
            throw new Error('Invalid point value.');
        }
        if (this._1pointAssigned && points === 1) {
            throw new Error('Point value 1 has already been assigned.');
        }
        if (this._3pointsAssigned && points === 3) {
            throw new Error('Point value 3 has already been assigned.');
        }
        if (points === 1) {
            this._1pointAssigned = true;
            this._scores[receivingPlayerId] += 1;
            this._scores[playerId] += 1;
        }
        if (points === 3) {
            this._1pointAssigned = true;
            this._3pointsAssigned = true;
            if (!this._1pointAssigned) {
                this._scores[receivingPlayerId] += 4;
                this._scores[playerId] += 4;
            }
            else {
                this._scores[receivingPlayerId] += 3;
                this._scores[playerId] += 3;
            }
        }
        if (this._1pointAssigned && this._3pointsAssigned) {
            return this.stopTurn(playerId);
        }
        return 'point-assigned';
    };
    Game.prototype.deductPoint = function (playerId, points) {
        if (!this._isPlaying) {
            throw new Error('Game has not started by the host yet.');
        }
        var currentTurnPlayer = this.getCurrentTurnPlayer();
        if (playerId !== currentTurnPlayer.id) {
            throw new Error('Only current turn player can deduct score.');
        }
        if (points !== 1) {
            throw new Error('Invalid point value.');
        }
        this._scores[playerId] -= 1;
        this._scores[playerId] = Math.max(this._scores[playerId], 0);
        return this.stopTurn(playerId);
    };
    Game.prototype.advanceTurn = function () {
        this._timer.stop();
        this._isPaused = false;
        this._isTurnStarted = false;
        var nextTurnPlayer = this._currentTurnPlayer;
        var nextTurn = this._currentTurn;
        do {
            nextTurn = ((this._currentTurnPlayer + 1) === this._turnOrder.length) ? this._currentTurn + 1 : this._currentTurn;
            nextTurnPlayer = (this._currentTurnPlayer + 1) % this._turnOrder.length;
            if (nextTurn > this._room.turnCount) {
                return 'end-game';
            }
        } while (this._turnOrder[nextTurnPlayer] === -1);
        this._currentTurnPlayer = nextTurnPlayer;
        this._currentTurn = nextTurn;
        this._isPaused = false;
        this._isTurnStarted = false;
        return 'player-changed';
    };
    Game.prototype.reset = function () {
        this._timer.stop();
        this._isPlaying = false;
        this._isPaused = false;
        this._isTurnStarted = false;
        this._turnOrder = [];
        this._cardRandomizer.reset();
        this._currentTurnPlayer = -1;
        this._currentTurn = 0;
        this._currentCard = undefined;
        this._scores = {};
        this._1pointAssigned = false;
        this._3pointsAssigned = false;
    };
    Game.prototype.pause = function (playerId) {
        if (this._isPlaying && this._isTurnStarted && !this._isPaused) {
            var currentTurnPlayer = this.getCurrentTurnPlayer();
            if (playerId === currentTurnPlayer.id) {
                this._timer.pause();
                this._isPaused = true;
            }
        }
    };
    Game.prototype.resume = function (playerId) {
        if (this._isPlaying && this._isTurnStarted && this._isPaused) {
            var currentTurnPlayer = this.getCurrentTurnPlayer();
            if (playerId === currentTurnPlayer.id) {
                this._timer.resume();
                this._isPaused = false;
            }
        }
    };
    Game.prototype.getCurrentTurnPlayer = function () {
        if (!this._isPlaying) {
            return new player_1.Player('', '');
        }
        return this._players[this._turnOrder[this._currentTurnPlayer]];
    };
    Game.prototype.join = function (player) {
        if (this._isPlaying) {
            throw new Error('Game has been started');
        }
        var findPlayer = this._players.find(function (p) { return p.id === player.id; });
        if (!findPlayer) {
            this._players.push(player);
        }
    };
    Game.prototype.leave = function (playerId) {
        var result = new leave_result_1.LeaveResult(this._id, this._players.length);
        var playerIndex = this._players.findIndex(function (p) { return p.id === playerId; });
        if (playerIndex !== -1) {
            var removedPlayer = this._players.splice(playerIndex, 1)[0];
            result.hasPlayerLeft = true;
            result.playerLeft = removedPlayer;
            result.playerCount = this._players.length;
            if (this._isPlaying) {
                if (this._players.length > 1) {
                    this._turnOrder[this._currentTurnPlayer] = -1;
                    for (var i = 0; i < this._turnOrder.length; i++) {
                        if (this._turnOrder[i] > playerIndex) {
                            this._turnOrder[i]--;
                        }
                    }
                    if (this._turnOrder[this._currentTurnPlayer] === playerIndex) {
                        var change = this.advanceTurn();
                        if (change === 'end-game') {
                            result.hasGameEnded = true;
                        }
                        else {
                            result.hasTurnAdvanced = true;
                        }
                    }
                }
                else if (this._players.length === 1) {
                    result.hasGameEnded = true;
                    result.hostChanged = true;
                    result.newHost = this._players[0];
                }
            }
            if (this._host === removedPlayer.id && this.players.length > 0) {
                var newHost = this._players[Math.floor(Math.random() * this._players.length)];
                this._host = newHost.id;
                result.hostChanged = true;
                result.newHost = newHost;
            }
        }
        else {
            result.playerCount = this._players.length;
        }
        return result;
    };
    Game.prototype.setCallback = function (intervalCallback, interval, timeoutCallback) {
        this._timer.setIntervalCallback(intervalCallback, interval);
        this._timer.setTimeoutCallback(timeoutCallback);
    };
    Game.prototype.generateRandomId = function () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    Game.prototype.getRandomizedOrder = function (count) {
        var range = Array.from(Array(count).keys());
        var randomOrder = [];
        while (range.length) {
            var randomIndex = Math.floor(Math.random() * range.length);
            var val = range[randomIndex];
            range.splice(randomIndex, 1);
            randomOrder.push(val);
        }
        return randomOrder;
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map