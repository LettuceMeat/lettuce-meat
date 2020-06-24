import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {thunkLoadMessages, thunkLoadRoomUsers, thunkUpdateUserRoom, thunkUpdateUserLoc} from '../store/thunks'
import {createMessage, addRoomUser, updateUserLoc} from '../store/actions'
import findLocation from '../hooks/getLocation'
import socket from '../socket'
import ChatRoom from './ChatRoom'
import GoogleMapCard from './GoogleMapCard'
import axios from 'axios'

export default function RoomMaster() {
  const user = useSelector(state => state.user)
  const roomUsers = useSelector(state => state.roomUsers)
  const dispatch = useDispatch()
  const {roomId} = useParams()
  const [getLocation, location] = findLocation()

  useEffect(() => {
    let inRoom = true
    if (inRoom && user.userName && location.latitude) {
      dispatch(thunkUpdateUserLoc(user, [location.latitude, location.longitude]))
    }
    if (user.userName) {
      dispatch(thunkUpdateUserRoom(user, roomId))
    } 

    return () => {inRoom = false}
  }, [user, location])

  useEffect(() => {
    let inRoom = true
    return () => {inRoom = false}
  }, [roomUsers])

  //join effect - join room, load previous messages, set up socket
  useEffect(() => {
    let inRoom = true
    if (inRoom) {
      dispatch(thunkLoadMessages(roomId))
      dispatch(thunkLoadRoomUsers(roomId))
    }

    socket.emit('join', roomId)
    socket.on('roomMessageReceive', content => {
      dispatch(createMessage(content))
    })
    socket.on('roomUserReceive', user => {
      dispatch(addRoomUser(user))
    })
    socket.on('roomLocationReceive', user => {
      dispatch(updateUserLoc(user))
    })

    return () => {
      inRoom = false
      socket.emit('leave', roomId)
    }
  }, [])

  const sendMessage = message => axios.post(`/api/messages/${roomId}`, {message})

  return (
    <div>
      <div className='mapContainer'>
       {location.latitude && <GoogleMapCard latitude={location.latitude} longitude={location.longitude} userData={roomUsers}/>}
      </div>
      <div className='chatContainer'>
        <ChatRoom roomId={roomId} sendMessage={sendMessage} />
      </div>
    </div>
  )
}