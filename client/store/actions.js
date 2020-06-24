import {LOAD_MESSAGES, CREATE_MESSAGE, LOAD_RESTAURANTS} from './constants'

const loadMessages = messages => ({type: LOAD_MESSAGES, messages})
const createMessage = message => ({type: CREATE_MESSAGE, message})
const loadRestaurants = restaurants => ({type: LOAD_RESTAURANTS, restaurants})

export {
    loadMessages,
    createMessage,
    loadRestaurants
}
