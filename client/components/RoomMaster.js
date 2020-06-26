import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {thunkLoadMessages, thunkLoadRoomUsers} from '../store/thunks'
import {createMessage, initUser} from '../store/actions'
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

  //someimtes initialize leads before load users

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
      dispatch(initUser(user))
    })

    return () => {
      inRoom = false
      socket.emit('leave', roomId)
    }
  }, [])

  useEffect(() => {
    let inRoom = true
    if (inRoom && user.id && location.latitude) {
      const locationData = {lat: location.latitude*1, lng: location.longitude*1}
      axios.put(`/api/users/initialize/${user.id}/${roomId}`, locationData)
    }
    return () => {inRoom = false}
  }, [user, location])

  const sendMessage = message => axios.post(`/api/messages/${roomId}`, {message})

  return (
    <div>
      <div className='mapContainer'>
       {roomUsers.length && <GoogleMapCard userData={roomUsers}/>}
      </div>
      <div className='chatContainer'>
        <ChatRoom roomId={roomId} sendMessage={sendMessage} />
      </div>
    </div>
  )
}