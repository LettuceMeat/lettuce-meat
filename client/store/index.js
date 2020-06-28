import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {LOAD_MESSAGES, CREATE_MESSAGE, LOAD_RESTAURANTS, CREATE_RESTAURANT} from './constants'

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

const reducer = combineReducers({
  user,
  messages: messageReducer,
  restaurants: restaurantReducer,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
