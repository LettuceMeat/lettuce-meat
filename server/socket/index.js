let _io

const setup = io => {
  _io = io
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join', roomId => {
      socket.join(roomId)
    })

    socket.on('location', (roomId, user, location) => {
      console.log('got loc')
      io
        .to(roomId)
        .emit('locationMessage', `${user.userName} is at ${location[0]}, ${location[1]}`)
    })

    socket.on('roomMessageSend', (roomId, content) => {
      socket.to(roomId).emit('roomMessageReceive', content)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}

module.exports = {
  setup,
  getIO: () => _io
}
