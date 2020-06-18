import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', arg => {
  console.log('Connected 2!')
})

socket.on('roomMessage', message => {
  console.log('room message', message)
})

socket.on('testMessage', () => {
  console.log('got a test message')
})

export default socket
