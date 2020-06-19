import io from 'socket.io-client'
import {createMessage} from './store/actions'

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

socket.on('locationMessage', message => {
  console.log('**location message**', message)
})

export default socket
