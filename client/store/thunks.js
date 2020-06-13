import axios from 'axios'
import {loadMessages, createMessage} from './actions'

const thunkLoadMessages = () => async dispatch => {
  const messages = (await axios.get('/api/messages')).data
  return dispatch(loadMessages(messages))
}
const thunkCreateMessage = message => async dispatch => {
  const newMessage = (await axios.post('/api/messages', message)).data
  dispatch(createMessage(newMessage))
}

export {thunkLoadMessages, thunkCreateMessage}
