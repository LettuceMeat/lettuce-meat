import {LOAD_MESSAGES, CREATE_MESSAGE, LOAD_ROOM} from './constants'

const loadMessages = messages => ({type: LOAD_MESSAGES, messages})
const createMessage = message => ({type: CREATE_MESSAGE, message})

const loadRoom = room => ({type: LOAD_ROOM, room})

export {loadMessages, createMessage, loadRoom}
