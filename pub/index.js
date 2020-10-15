"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var games_1 = require("./game/games");
var socket_response_1 = require("./game/socket-response");
var app = express();
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('App is listening on port 3000!');
});
var io = require('socket.io').listen(server);
var games = new games_1.Games(9);
var playerSocketMap = new Map();
io.on('connection', function (socket) {
    socket.on('join-lobby', function () {
        socket.join('lobby');
        socket.emit('lobby-update', games.lobbyInfo);
    });
    socket.on('leave-lobby', function () {
        socket.leave('lobby');
    });
    socket.on('create-room', function (room, player, callback) {
        try {
            var gameId = games.createGame(room, player);
            io.to('lobby').emit('lobby-update', games.lobbyInfo);
            callback(new socket_response_1.SocketResponse(true, undefined, { gameId: gameId }, undefined));
        }
        catch (error) {
            callback(new socket_response_1.SocketResponse(false, 'room-limit', undefined, error.message));
        }
    });
    socket.on('join', function (gameId, player, callback) {
        try {
            games.joinGame(gameId, player);
            var game = games.find(gameId);
            if (game) {
                playerSocketMap.set(player.id, socket.id);
                socket.join(gameId);
                io.to('lobby').emit('lobby-update', games.lobbyInfo);
                io.to(gameId).emit('player-update', game.players);
                callback(new socket_response_1.SocketResponse(true, undefined, game.metadata, undefined));
            }
        }
        catch (error) {
            callback(new socket_response_1.SocketResponse(false, 'unable-to-join', undefined, error.message));
        }
    });
    socket.on('leave', function (playerId) {
        var result = games.leaveGame(playerId);
        if (result) {
            var game = games.find(result.gameId);
            if (game) {
                if (result.playerCount !== 0) {
                    if (result.hasPlayerLeft) {
                        io.to(game.id).emit('player-update', game.players);
                        io.to(game.id).emit('player-leave-update', result.playerLeft);
                    }
                    if (result.hasGameEnded) {
                        io.to(game.id).emit('end-game', game.state);
                        game.reset();
                        io.to(game.id).emit('game-update', game.state);
                    }
                    if (result.hasTurnAdvanced) {
                        io.to(game.id).emit('game-update', game.state);
                        io.to(game.id).emit('assign-player', game.getCurrentTurnPlayer());
                    }
                    if (result.hostChanged) {
                        io.to(game.id).emit('host-changed', result.newHost);
                    }
                    io.to(game.id).emit('player-leave-update', result.playerLeft);
                }
            }
            io.to('lobby').emit('lobby-update', games.lobbyInfo);
            socket.leave(result.gameId);
        }
        if (playerSocketMap.has(playerId)) {
            playerSocketMap.delete(playerId);
        }
    });
    socket.on('start', function (playerId, callback) {
        try {
            var game_1 = games.findGameOfPlayer(playerId);
            if (game_1) {
                game_1.start(playerId);
                game_1.setCallback(function () {
                    if (game_1) {
                        io.to(game_1.id).emit('time-update', game_1.timeRemaining);
                    }
                }, 100, function () {
                    if (game_1) {
                        io.to(game_1.id).emit('time-update', 0);
                    }
                });
                io.to('lobby').emit('lobby-update', games.lobbyInfo);
                io.to(game_1.id).emit('game-update', game_1.state);
                callback(new socket_response_1.SocketResponse(true, undefined, undefined, undefined));
            }
            else {
                callback(new socket_response_1.SocketResponse(false, 'game-not-exist', undefined, 'Game does not exist.'));
            }
        }
        catch (error) {
            callback(new socket_response_1.SocketResponse(false, 'unable-to-start', undefined, error.message));
        }
    });
    socket.on('start-turn', function (playerId, callback) {
        try {
            var game = games.findGameOfPlayer(playerId);
            if (game) {
                game.startTurn(playerId);
                io.to(game.id).emit('game-update', game.state);
                callback(new socket_response_1.SocketResponse(true, undefined, game.currentCard, undefined));
            }
        }
        catch (error) {
            callback(new socket_response_1.SocketResponse(false, 'start-turn-error', undefined, error.message));
        }
    });
    socket.on('pause', function (playerId) {
        var game = games.findGameOfPlayer(playerId);
        if (game) {
            game.pause(playerId);
            io.to(game.id).emit('game-update', game.state);
        }
    });
    socket.on('resume', function (playerId) {
        var game = games.findGameOfPlayer(playerId);
        if (game) {
            game.resume(playerId);
            io.to(game.id).emit('game-update', game.state);
        }
    });
    socket.on('stop-turn', function (playerId, callback) {
        try {
            var game = games.findGameOfPlayer(playerId);
            if (game) {
                var change = game.stopTurn(playerId);
                if (change === 'player-changed') {
                    io.to(game.id).emit('game-update', game.state);
                    io.to(game.id).emit('assign-player', game.getCurrentTurnPlayer());
                }
                else {
                    io.to(game.id).emit('end-game', game.state);
                    game.reset();
                    io.to(game.id).emit('game-update', game.state);
                }
                callback(new socket_response_1.SocketResponse(true, undefined, undefined, undefined));
            }
            else {
                callback(new socket_response_1.SocketResponse(false, 'stop-turn-error', undefined, 'Unable to find game'));
            }
        }
        catch (error) {
            callback(new socket_response_1.SocketResponse(false, 'stop-turn-error', undefined, error.message));
        }
    });
    socket.on('assign-points', function (playerId, receivingPlayerId, points, callback) {
        try {
            var game = games.findGameOfPlayer(playerId);
            if (game) {
                var change = game.assignPoint(playerId, receivingPlayerId, points);
                if (change === 'end-game') {
                    io.to(game.id).emit('end-game', game.state);
                    game.reset();
                    io.to(game.id).emit('game-update', game.state);
                }
                else {
                    io.to(game.id).emit('game-update', game.state);
                    io.to(game.id).emit('assign-player', game.getCurrentTurnPlayer());
                }
                callback(new socket_response_1.SocketResponse(true, undefined, undefined, undefined));
            }
            else {
                callback(new socket_response_1.SocketResponse(false, 'assign-point-error', undefined, 'Unable to find game'));
            }
        }
        catch (error) {
            callback(new socket_response_1.SocketResponse(false, 'assign-point-error', undefined, error.message));
        }
    });
    socket.on('deduct-points', function (playerId, points, callback) {
        try {
            var game = games.findGameOfPlayer(playerId);
            if (game) {
                var change = game.deductPoint(playerId, points);
                if (change === 'end-game') {
                    io.to(game.id).emit('end-game', game.state);
                    game.reset();
                    io.to(game.id).emit('game-update', game.state);
                }
                else {
                    io.to(game.id).emit('game-update', game.state);
                    io.to(game.id).emit('assign-player', game.getCurrentTurnPlayer());
                }
                callback(new socket_response_1.SocketResponse(true, undefined, undefined, undefined));
            }
            else {
                callback(new socket_response_1.SocketResponse(false, 'deduct-point-error', undefined, 'Unable to find game'));
            }
        }
        catch (error) {
            callback(new socket_response_1.SocketResponse(false, 'deduct-point-error', undefined, error.message));
        }
    });
});
//# sourceMappingURL=index.js.map