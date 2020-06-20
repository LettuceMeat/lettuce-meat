import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import ChatRoom from './ChatRoom'
import socket from '../socket'
import {thunkLoadMessages, thunkCreateMessage} from '../store/thunks'
import {createMessage} from '../store/actions'

export default function RoomMaster() {
  const dispatch = useDispatch()
  const {roomId} = useParams()

  //TO DO check if roomId exists in db. if not redirect back to home

  socket.emit('join', roomId)

  useEffect(() => {
    let isSubscribed = true
    isSubscribed && dispatch(thunkLoadMessages(roomId))
    socket.on('roomMessageReceive', content => {
      dispatch(createMessage(content))
    })
    return () => {
      isSubscribed = false
    }
  }, [])

  const msgRoom = content => dispatch(thunkCreateMessage(roomId, content))

  return (
    <div>
      <ChatRoom roomId={roomId} msgRoom={msgRoom} />
    </div>
  )
}
