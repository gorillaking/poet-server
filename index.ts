import * as express from 'express';
import { Games } from "./game/games";
import { Player } from "./game/player";
import { Room } from "./game/room";
import { SocketResponse } from "./game/socket-response";

const app = express();
const server = app.listen(process.env.PORT || 3000, function() {
  console.log('App is listening on port 3000!');
});
const io = require('socket.io').listen(server);

const games: Games = new Games(9);

io.on('connection', (socket: any) => {
  socket.on('join-lobby', () => {
    socket.join('lobby');
    socket.emit('lobby-update', games.lobbyInfo);
  });

  socket.on('leave-lobby', () => {
    socket.leave('lobby');
  });

  socket.on('create-room', (room: Room, player: Player, callback: (response: SocketResponse) => void) => {
    try{
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
      io.to('lobby').emit('lobby-update', games.lobbyInfo);
      callback(new SocketResponse(true, undefined, undefined, undefined));
    } catch(error) {
      callback(new SocketResponse(false, 'unable-to-join', null, error.message));
    }
  });
});


