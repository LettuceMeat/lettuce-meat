import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {LOAD_MESSAGES, CREATE_MESSAGE, LOAD_ROOM, LOAD_ROOMUSERS, ADD_ROOMUSER, UPDATE_USERLOC, INITIALIZE_USER, LOAD_RESTAURANTS, CREATE_RESTAURANT} from './constants'

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return action.messages
    case CREATE_MESSAGE:
      if (state.some(message => message.id === action.message.id)) {
        return state
      }
      return [...state, action.message]
    default:
      return state
  }
}

const restaurantReducer = (state=[], action) => {
  switch (action.type) {
    case LOAD_RESTAURANTS:
      return action.restaurants
    case CREATE_RESTAURANT:
      return [...state, action.restaurant]
    default:
      return state
  }
}

const roomReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ROOM:
      return action.room
    default:
      return state
  }
}

const roomUsersReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ROOMUSERS:
      return action.roomUsers
      case ADD_ROOMUSER:
        if (state.some(roomUser => roomUser.id === action.roomUser.id)) {
          return state
        }
        return [...state, action.roomUser]
      case UPDATE_USERLOC:
        return state.map(user => {
          if (user.id === action.userLoc.id) {
            return action.userLoc
          } else {
            return user
          }
        })
      case INITIALIZE_USER:
        if (state.some(roomUser => roomUser.id === action.initializedUser.id)) {
          return state.map(user => {
            if (user.id === action.initializedUser.id) {
              return action.initializedUser
            } else {
              return user
            }
          })
        }
        return [...state, action.initializedUser]
  }
}

const reducer = combineReducers({
  user,
  messages: messageReducer,
  restaurants: restaurantReducer,
  room: roomReducer,
  roomUsers: roomUsersReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
