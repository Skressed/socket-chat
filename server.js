const io = require('socket.io')({
    cors: {
        origin: '*',
    }
});

let rooms = [];

io.on('connection', (socket) => {
  console.log('a user ' + socket.id + ' connected');

  io.to(socket.id).emit('giveRooms', rooms);

  socket.on('disconnecting', () => {
    if (Object.keys(socket.rooms).length > 1) {
      let msg = 'User ' + socket.id + ' disconnected from room ';
      if (socket.id === (Object.keys(socket.rooms))[1]) {
        msg = msg + Object.keys(socket.rooms)[0];
        io.to(Object.keys(socket.rooms)[0]).emit('newMessage', msg);
      } else {
        msg = msg + Object.keys(socket.rooms)[1];
        io.to(Object.keys(socket.rooms)[1]).emit('newMessage', msg);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('a user ' + socket.id + ' disconnected');
  });

  socket.on('sendUpdateUsers', function(data) {
    io.emit('usersUpdate', data)
  });

  socket.on('signUpForConsult', function(data) {
    io.emit('signUp', data, socket.id)
  });

  socket.on('create', function(data) {
    if (!rooms.find(elem => elem.name === data)) {
        rooms.push({name: data, id: socket.id});
        io.emit('giveRooms', rooms);
        socket.join(data);
        console.log('a user ' + socket.id + ' joined room ' + data);
        let msg = 'User ' + socket.id + ' created room ' + data; 
        io.to(data).emit('newMessage', msg);
        io.to(socket.id).emit('initPeer', true);
    }
    else {
        socket.join(data);
        console.log('a user ' + socket.id + ' joined room ' + data);
        let msg = 'User ' + socket.id + ' joined room ' + data; 
        io.to(data).emit('newMessage', msg);
        io.to(socket.id).emit('initPeer', false);
    }
  });

  socket.on('message', function(room, message) {
    io.to(room).emit('newMessage', message);
  });

  /*socket.on('signal', function(data, roomName) {
    console.log(data);
    io.to(roomName).emit('sendSignal', data);
  })*/
});

io.listen(process.env.PORT || 1010);