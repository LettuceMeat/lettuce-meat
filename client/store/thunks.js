import axios from 'axios'
import {loadMessages, createMessage, loadRoom} from './actions'

const thunkLoadMessages = roomId => async dispatch => {
  const messages = (await axios.get(`/api/messages/${roomId}`)).data
  return dispatch(loadMessages(messages))
}
const thunkCreateMessage = (roomId, message) => async dispatch => {
  const newMessage = (await axios.post(`/api/messages/${roomId}`, {message}))
    .data
  dispatch(createMessage(newMessage))
}

const thunkLoadRoom = roomId => async dispatch => {
  const room = (await axios.get(`/api/room/${roomId}`)).data
  return dispatch(loadRoom(room))
}

export {thunkLoadMessages, thunkCreateMessage, thunkLoadRoom}
