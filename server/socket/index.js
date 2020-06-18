let _io

const setup = io => {
  _io = io
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join', (roomId, name) => {
      socket.join(roomId)
      socket.to(roomId).emit('roomMessage', `${name} has joined`)
    })

    socket.on('roomMessage', (roomId, name, message) => {
      socket.to(roomId).emit('roomMessage', `${name} says ${message}`)
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
