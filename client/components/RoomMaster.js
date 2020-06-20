import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {thunkLoadMessages, thunkCreateMessage} from '../store/thunks'
import {createMessage} from '../store/actions'
import socket from '../socket'
import ChatRoom from './ChatRoom'

export default function RoomMaster() {
  const dispatch = useDispatch()
  const {roomId} = useParams()

  useEffect(() => {
    let inRoom = true
    socket.emit('join', roomId)

    inRoom && dispatch(thunkLoadMessages(roomId))
    socket.on('roomMessageReceive', content => {
      dispatch(createMessage(content))
    })

    return () => {
      inRoom = false
      socket.emit('leave', roomId)
    }
  }, [])

  const msgRoom = content => dispatch(thunkCreateMessage(roomId, content))

  return (
    <div>
      <ChatRoom roomId={roomId} msgRoom={msgRoom} />
    </div>
  )
}

//TO DO ***
//check if roomId exists in db. if not:
//  redirect back to home
//check if logged in if not:
//  check if guest from local storage if not:
//    display a name input then create a guest and save the id to local storage
//go to room
