import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import findLocation from '../hooks/getLocation'
import ChatRoom from './ChatRoom'
import socket from '../socket'
import {thunkLoadMessages, thunkCreateMessage} from '../store/thunks'
import {createMessage} from '../store/actions'

export default function RoomMaster() {
  const [getLocation, location] = findLocation()
  const dispatch = useDispatch()
  const {roomId} = useParams()

  socket.emit('join', roomId)

  useEffect(() => {
    dispatch(thunkLoadMessages(roomId))
    socket.on('roomMessageReceive', content => {
      dispatch(createMessage(content))
    })
  }, [])

  const msgRoom = content => {
    console.log(roomId, content)
    dispatch(thunkCreateMessage(roomId, content))
  }

  const msgLocation = () =>
    socket.emit('location', roomId, name, [
      location.latitude,
      location.longitude
    ])

  return (
    <div>
      {/* <button type="button" onClick={() => msgLocation()}>
        DEBUG send my location
      </button> */}
      <ChatRoom roomId={roomId} msgRoom={msgRoom} />
    </div>
  )
}
