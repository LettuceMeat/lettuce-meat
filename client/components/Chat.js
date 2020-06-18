import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import socket from '../socket'

export default function Chat() {
  const [name, setName] = useState()
  const [message, setMessage] = useState()
  const {roomId} = useParams()

  const joinRoom = () => socket.emit('join', roomId, name)

  const msgRoom = () => socket.emit('roomMessage', roomId, name, message)

  return (
    <div>
      <h1>{`you are in room: ${roomId}`}</h1>
      name <input onChange={ev => setName(ev.target.value)} />
      <br />
      message <input onChange={ev => setMessage(ev.target.value)} />
      <br />
      <button onClick={() => joinRoom()}>join this room</button>
      <br />
      <button onClick={() => msgRoom()}>msg this room</button>
    </div>
  )
}
