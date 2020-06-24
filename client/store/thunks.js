import axios from 'axios'
import {loadMessages, createMessage, loadRoom, loadRoomUsers, updateUserRoom, updateUserLoc} from './actions'

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

const thunkLoadRoomUsers = roomId => async dispatch => {
  const roomUsers = (await axios.get(`/api/users/${roomId}`)).data
  return dispatch(loadRoomUsers(roomUsers))
}

const thunkUpdateUserRoom = (user, roomId) => async dispatch => {
  const newUser = (await axios.put(`/api/users/room/${user.id}/${roomId}`)).data
  return dispatch(updateUserRoom(newUser))
}

const thunkUpdateUserLoc = (user, loc) => async dispatch => {
  const location = {lat: loc[0], lng: loc[1]}
  const userLoc = (await axios.put(`/api/users/location/${user.id}`, location)).data
  return dispatch(updateUserLoc(userLoc))
}


export {thunkLoadMessages, thunkCreateMessage, thunkLoadRoom, thunkLoadRoomUsers, thunkUpdateUserRoom, thunkUpdateUserLoc}
