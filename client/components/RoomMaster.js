import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {thunkLoadMessages, thunkLoadRoomUsers} from '../store/thunks'
import {createMessage, initUser} from '../store/actions'
import findLocation from '../hooks/getLocation'
import socket from '../socket'
import ChatRoom from './ChatRoom'
import GoogleMapCard from './GoogleMapCard'
import axios from 'axios'
import {averageUserLocation} from '../../script/utils'
import Preferences from './Preferences'

export default function RoomMaster() {
  const [center, setCenter] = useState({lat: 0, lng: 0})
  const user = useSelector(state => state.user)
  const roomUsers = useSelector(state => state.roomUsers)
  const dispatch = useDispatch()
  const {roomId} = useParams()
  const [getLocation, location] = findLocation()

  //BUG sometimes initialize loads before load users

  //on mount - load data, join socket room, set up socket to receive
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

  //calculate the rooms center every time the roomusers updates
  useEffect(() => {
    let inRoom = true
    inRoom && roomUsers && setCenter(averageUserLocation(roomUsers))
    return () => {
      inRoom = false
    }
  }, [roomUsers])

  //once we have the user and location put it to the db and send to sockets
  useEffect(() => {
    let inRoom = true
    if (inRoom && user.id && location.latitude) {
      const locationData = {
        lat: location.latitude * 1,
        lng: location.longitude * 1
      }
      axios.put(`/api/users/initialize/${user.id}/${roomId}`, locationData)
    }
    return () => {
      inRoom = false
    }
  }, [user, location])

  const sendMessage = message =>
    axios.post(`/api/messages/${roomId}`, {message})

  return (
    <div>
      <div className="mapContainer">
        {roomUsers.length && <GoogleMapCard userData={roomUsers} />}
      </div>
      <div className="chatContainer">
        <ChatRoom roomId={roomId} sendMessage={sendMessage} />
        <Preferences roomUsers={roomUsers} />
      </div>
    </div>
  )
}
