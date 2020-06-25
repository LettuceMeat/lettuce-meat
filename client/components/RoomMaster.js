import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {thunkLoadMessages, thunkLoadRoomUsers, thunkUpdateUserRoom, thunkUpdateUserLoc, thunkInitUser} from '../store/thunks'
import {createMessage, addRoomUser, updateUserLoc, initUser} from '../store/actions'
import findLocation from '../hooks/getLocation'
import socket from '../socket'
import ChatRoom from './ChatRoom'
import GoogleMapCard from './GoogleMapCard'
import axios from 'axios'
import {averageUserLocation} from '../../script/utils'

export default function RoomMaster() {
  const [center, setCenter] = useState({lat: 40, lng: -70})
  const user = useSelector(state => state.user)
  const roomUsers = useSelector(state => state.roomUsers)
  const dispatch = useDispatch()
  const {roomId} = useParams()
  const [getLocation, location] = findLocation()

  useEffect(() => {
    let inRoom = true
    if (inRoom && user.id && location.latitude) {
      dispatch(thunkInitUser(user, roomId, [location.latitude, location.longitude]))
    }

    return () => {inRoom = false}
  }, [user, location])

  useEffect(() => {
    let inRoom = true
    const check = roomUsers.every(user => user.lat)
    if (inRoom && check) {
      setCenter(averageUserLocation(roomUsers))
    }
    return () => {inRoom = false}
  }, [roomUsers])

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
       {<GoogleMapCard center={center} userData={roomUsers}/>}
      </div>
      <div className='chatContainer'>
        <ChatRoom roomId={roomId} sendMessage={sendMessage} />
      </div>
    </div>
  )
}