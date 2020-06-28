import axios from 'axios'
import {loadMessages, createMessage, loadRestaurants, createRestaurant} from './actions'

const getSponsoredRestaurants = () => async dispatch => {
  const sponsoredRestaurants = (await axios.get(`/api/restaurants`)).data;
  return dispatch(loadRestaurants(sponsoredRestaurants))
}

const thunkCreateRestaurant = restaurant => async dispatch => {
  const _restaurant = (await axios.post('/api/restaurants', restaurant)).data;
  return dispatch(createRestaurant(_restaurant))
}

const thunkLoadMessages = roomId => async dispatch => {
  const messages = (await axios.get(`/api/messages/${roomId}`)).data
  return dispatch(loadMessages(messages))
}
const thunkCreateMessage = (roomId, message) => async dispatch => {
  const newMessage = (await axios.post(`/api/messages/${roomId}`, {message}))
    .data
  dispatch(createMessage(newMessage))
}

export {
  thunkLoadMessages,
  thunkCreateMessage,
  thunkCreateRestaurant,
  getSponsoredRestaurants,
}
