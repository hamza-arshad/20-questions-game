function listenForConnections(io) {
  io.on('connection', (socket) => {
    console.log("SOCKETS");
    console.log(socket.id);
    console.log(JSON.stringify(socket.handshake));
    console.log(socket.data);
    console.log(socket.query);
  });

  io.on('authenticate', (socket) => {

  });
}

function triggerUpdate(room, data) {
  const { socket: {
    io
  }} = global;
  io.emit(room, data);
}

module.exports = {
  triggerUpdate,
  listenForConnections,
}