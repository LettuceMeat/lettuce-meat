import io from 'socket.io-client'

const socket = io('window.location.origin')

socket.on('connect', arg => {
  console.log('Connected 2!')
})

socket.on('testing', () => {
  console.log('testing here!')
})

socket.on('testMessage', arg => {
  console.log('testing here!', arg)
})

export default socket
