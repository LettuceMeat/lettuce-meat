import {
    LOAD_MESSAGES,
    CREATE_MESSAGE,
    LOAD_RESTAURANTS,
    CREATE_RESTAURANT,
    LOAD_ROOM,
    LOAD_ROOMUSERS,
    UPDATE_USERROOM,
    ADD_ROOMUSER,
    UPDATE_USERLOC,
    INITIALIZE_USER,
    LOAD_ALL_MESSAGES
} from './constants'

const loadMessages = messages => ({type: LOAD_MESSAGES, messages})
const createMessage = message => ({type: CREATE_MESSAGE, message})

const loadRestaurants = restaurants => ({type: LOAD_RESTAURANTS, restaurants})
const createRestaurant = restaurant => ({type: CREATE_RESTAURANT, restaurant})

const loadRoom = room => ({type: LOAD_ROOM, room})
const loadAllMessages = allMessages => ({type: LOAD_ALL_MESSAGES, allMessages})

const loadRoomUsers = roomUsers => ({type: LOAD_ROOMUSERS, roomUsers})
const addRoomUser = roomUser => ({type: ADD_ROOMUSER, roomUser})

const updateUserRoom = newUser => ({type: UPDATE_USERROOM, newUser})
const updateUserLoc = userLoc => ({type: UPDATE_USERLOC, userLoc})

const initUser = initializedUser => ({type: INITIALIZE_USER, initializedUser})


export {
    loadMessages,
    createMessage,
    loadRestaurants,
    createRestaurant,
    loadRoom,
    loadRoomUsers,
    updateUserRoom,
    addRoomUser,
    updateUserLoc,
    initUser,
    loadAllMessages
}
