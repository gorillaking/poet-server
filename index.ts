import * as express from 'express';
import e = require('express');
import { Games } from "./game/games";
import { Player } from "./game/player";
import { Room } from "./game/room";
import { SocketResponse } from "./game/socket-response";
import * as cors from 'cors';

const app = express();
app.use(cors());
const server = app.listen(process.env.PORT || 3000, function() {
  console.log('App is listening on port 3000!');
});
const io = require('socket.io').listen(server);

const games: Games = new Games(9);

const playerSocketMap: Map<string, string> = new Map<string, string>();

io.on('connection', (socket: any) => {
  socket.on('join-lobby', () => {
    socket.join('lobby');
    socket.emit('lobby-update', games.lobbyInfo);
  });

  socket.on('leave-lobby', () => {
    socket.leave('lobby');
  });

  socket.on('create-room', (room: Room, player: Player, callback: (response: SocketResponse) => void) => {
    try {
      let gameId = games.createGame(room, player);
      io.to('lobby').emit('lobby-update', games.lobbyInfo);
      callback(new SocketResponse(true, undefined, { gameId: gameId }, undefined));
    } catch(error) {
      callback(new SocketResponse(false, 'room-limit', undefined, error.message));
    }
  });

  socket.on('join', (gameId: string, player: Player, callback: (response: SocketResponse) => void) => {
    try{
      games.joinGame(gameId, player);
      let game = games.find(gameId);
      if(game) {
        playerSocketMap.set(player.id, socket.id);
        socket.join(gameId);
        io.to('lobby').emit('lobby-update', games.lobbyInfo);
        io.to(gameId).emit('player-update', game.players);
        callback(new SocketResponse(true, undefined, game.metadata , undefined));
      }
    } catch(error) {
      callback(new SocketResponse(false, 'unable-to-join', undefined, error.message));
    }
  });

  socket.on('leave', (playerId: string) => {
    let result = games.leaveGame(playerId);
    if(result){
      let game = games.find(result.gameId);
      if(game) {
        if(result.playerCount !== 0){
          if(result.hasPlayerLeft) {
            io.to(game.id).emit('player-update', game.players);
            io.to(game.id).emit('player-leave-update', result.playerLeft);
          }

          if(result.hasGameEnded) {
            io.to(game.id).emit('end-game', game.state);
            game.reset();
            io.to(game.id).emit('game-update', game.state);
          }

          if(result.hasTurnAdvanced) {
            io.to(game.id).emit('game-update', game.state);
            io.to(game.id).emit('assign-player', game.getCurrentTurnPlayer());
          }

          if(result.hostChanged) {
            io.to(game.id).emit('host-changed', result.newHost);
          }

          io.to(game.id).emit('player-leave-update', result.playerLeft);
        }
      }
      io.to('lobby').emit('lobby-update', games.lobbyInfo);

      socket.leave(result.gameId);
    }

    if(playerSocketMap.has(playerId)) {
      playerSocketMap.delete(playerId);
    }
  });

  socket.on('start', (playerId: string, callback: (response: SocketResponse) => void) => {
    try{
      let game = games.findGameOfPlayer(playerId);
      if(game) {
        game.start(playerId);
        game.setCallback(() => {
          if(game) {
            io.to(game.id).emit('time-update', game.timeRemaining); 
          }
        }, 100,
        () => {
          if(game) {
            io.to(game.id).emit('time-update', 0);
          }
        })
        io.to('lobby').emit('lobby-update', games.lobbyInfo);
        io.to(game.id).emit('game-update', game.state);
        callback(new SocketResponse(true, undefined, undefined, undefined));
      } else {
        callback(new SocketResponse(false, 'game-not-exist', undefined, 'Game does not exist.'));
      }
    } catch(error) {
      callback(new SocketResponse(false, 'unable-to-start', undefined, error.message));
    }
  });

  socket.on('start-turn', (playerId: string, callback: (response: SocketResponse) => void) => {
    try{
      let game = games.findGameOfPlayer(playerId);
      if(game) {
        game.startTurn(playerId);
        io.to(game.id).emit('game-update', game.state);
        callback(new SocketResponse(true, undefined, game.currentCard, undefined));
      }
    } catch(error) {
      callback(new SocketResponse(false, 'start-turn-error', undefined, error.message));
    }
  });

  socket.on('pause', (playerId: string) => {
    let game = games.findGameOfPlayer(playerId);
    if(game) {
      game.pause(playerId);
      io.to(game.id).emit('game-update', game.state);
    }
  });

  socket.on('resume', (playerId: string) => {
    let game = games.findGameOfPlayer(playerId);
    if(game) {
      game.resume(playerId);
      io.to(game.id).emit('game-update', game.state);
    }
  });

  socket.on('stop-turn', (playerId: string, callback: (response: SocketResponse) => void) => {
    try{
      let game = games.findGameOfPlayer(playerId);
      if(game) {
        let change = game.stopTurn(playerId);
        if(change === 'player-changed') {
          io.to(game.id).emit('game-update', game.state);
          io.to(game.id).emit('assign-player', game.getCurrentTurnPlayer());
        } else {
          io.to(game.id).emit('end-game', game.state);
          game.reset();
          io.to(game.id).emit('game-update', game.state);
        }

        callback(new SocketResponse(true, undefined, undefined, undefined));
      } else {
        callback(new SocketResponse(false, 'stop-turn-error', undefined, 'Unable to find game'));
      }
    } catch (error) {
      callback(new SocketResponse(false, 'stop-turn-error', undefined, error.message));
    }
  });

  socket.on('assign-points', (playerId: string, receivingPlayerId: string, points: number, callback: (response: SocketResponse) => void) => {
    try{
      let game = games.findGameOfPlayer(playerId);
      if(game) {
        let change = game.assignPoint(playerId, receivingPlayerId, points);
        if(change === 'end-game') {
          io.to(game.id).emit('end-game', game.state);
          game.reset();
          io.to(game.id).emit('game-update', game.state);
        } else {
          io.to(game.id).emit('game-update', game.state);
          io.to(game.id).emit('assign-player', game.getCurrentTurnPlayer());
        }
        
        callback(new SocketResponse(true, undefined, undefined, undefined));
      } else {
        callback(new SocketResponse(false, 'assign-point-error', undefined, 'Unable to find game'));
      }
    } catch (error) {
      callback(new SocketResponse(false, 'assign-point-error', undefined, error.message));
    }
  });

  socket.on('deduct-points', (playerId: string, points: number, callback: (response: SocketResponse) => void) => {
    try{
      let game = games.findGameOfPlayer(playerId);
      if(game){
        let change = game.deductPoint(playerId, points);
        if(change === 'end-game') {
          io.to(game.id).emit('end-game', game.state);
          game.reset();
          io.to(game.id).emit('game-update', game.state);
        } else {
          io.to(game.id).emit('game-update', game.state);
          io.to(game.id).emit('assign-player', game.getCurrentTurnPlayer());
        }

        callback(new SocketResponse(true, undefined, undefined, undefined));
      } else {
        callback(new SocketResponse(false, 'deduct-point-error', undefined, 'Unable to find game'));
      }
    } catch(error) {
      callback(new SocketResponse(false, 'deduct-point-error', undefined, error.message));
    }
  })
});


