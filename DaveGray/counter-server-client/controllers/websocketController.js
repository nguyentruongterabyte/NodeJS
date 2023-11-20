
const handleWSConnection = (socket) => {
  console.log('someone connected');
  socket.on('disconnect', () => {
    console.log('somemone has left');
  });

  socket.on('received', (message) => {
    counter += parseInt(message);
    socket.emit('received', counter);
    console.log(counter);
  });
};

module.exports = { handleWSConnection };
