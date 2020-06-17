let _io

const setup = io => {
  _io = io
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.join('testRoom')

    socket.on('testMessage', (room, message) => console.log(room, message))

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}

module.exports = {
  setup,
  getIO: () => _io
}
