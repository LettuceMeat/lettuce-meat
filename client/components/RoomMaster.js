import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {thunkLoadMessages} from '../store/thunks'
import {createMessage} from '../store/actions'
import findLocation from '../hooks/getLocation'
import socket from '../socket'
import ChatRoom from './ChatRoom'
import GoogleMapCard from './GoogleMapCard'
import axios from 'axios'

export default function RoomMaster() {
  const user = useSelector(state => state.user)
  // const roomUsers = useSelector(state => state.roomUsers)
  const messages = useSelector(state => state.messages)
  const dispatch = useDispatch()
  const {roomId} = useParams()
  const [getLocation, location] = findLocation()

  //location effect - update user location
  useEffect(() => {
    if (user.userName && location.latitude) {
      socket.emit('location', roomId, user, [location.latitude, location.longitude])
    }
  }, [location])

  //roomUsers effect - everytime someone joins update the room location
  // useEffect(() => {
  //   //run the average location util and update the view of the map
  // }, [roomUsers])

  //join effect - join room, load previous messages, set up socket
  useEffect(() => {
    let inRoom = true
    socket.emit('join', roomId)
    inRoom && dispatch(thunkLoadMessages(roomId))

    socket.on('roomMessageReceive', content => {
      dispatch(createMessage(content))
    })

    socket.on('locationMessage', message => {
      console.log('**location message**', message)
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
       {location.latitude && <GoogleMapCard latitude={location.latitude} longitude={location.longitude} />}
      </div>
      <div className='chatContainer'>
        <ChatRoom roomId={roomId} sendMessage={sendMessage} />
      </div>
    </div>
  )
}