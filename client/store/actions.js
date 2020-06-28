import {LOAD_MESSAGES, CREATE_MESSAGE, LOAD_RESTAURANTS, CREATE_RESTAURANT} from './constants'

const loadMessages = messages => ({type: LOAD_MESSAGES, messages})
const createMessage = message => ({type: CREATE_MESSAGE, message})
const loadRestaurants = restaurants => ({type: LOAD_RESTAURANTS, restaurants})
const createRestaurant = restaurant => ({type: CREATE_RESTAURANT, restaurant})

export {
    loadMessages,
    createMessage,
    loadRestaurants,
    createRestaurant
}
