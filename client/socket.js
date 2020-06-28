import io from 'socket.io-client'

const socket = io(window.location.origin)

// socket.on('connect', () => {
//   console.log('Connected')
// })

// socket.on('roomMessage', message => {
//   console.log('**room message**', message)
//   createMessage(message)
// })

socket.on('joinMessage', message => {
  console.log('**join message**', message)
})

export default socket
