import {LOAD_MESSAGES, CREATE_MESSAGE} from './constants'

const loadMessages = messages => ({type: LOAD_MESSAGES, messages})
const createMessage = message => ({type: CREATE_MESSAGE, message})

export {loadMessages, createMessage}
