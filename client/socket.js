import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('testing', () => {
  console.log('testing here!')
})

socket.on('testMessage', () => {
  console.log('testing here!')
})

export default socket
