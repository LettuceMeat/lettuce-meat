import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import findLocation from '../hooks/getLocation'
import socket from '../socket'

export default function RoomMaster() {
  const [name, setName] = useState()
  const [message, setMessage] = useState()
  const [getLocation, location] = findLocation()
  const {roomId} = useParams()

  const joinRoom = () => socket.emit('join', roomId, name)
  const msgRoom = () => socket.emit('roomMessage', roomId, name, message)
  const msgLocation = () =>
    socket.emit('location', roomId, name, [
      location.latitude,
      location.longitude
    ])

  return (
    <div>
      <h1>{`you are in room: ${roomId}`}</h1>
      name <input onChange={ev => setName(ev.target.value)} />
      <br />
      message <input onChange={ev => setMessage(ev.target.value)} />
      <br />
      <button type="button" onClick={() => joinRoom()}>
        join this room
      </button>
      <br />
      <button type="button" onClick={() => msgRoom()}>
        msg this room
      </button>
      <br />
      <button type="button" onClick={() => msgLocation()}>
        send my location
      </button>
    </div>
  )
}
