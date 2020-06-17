import React from 'react'
import {useParams} from 'react-router-dom'
const socket = require('../socket')
import axios from 'axios'

export default function Chat() {
  const {roomId} = useParams()
  axios.get(`/api/chat/${roomId}`)

  return <h1>{`you are in room: ${roomId}`}</h1>
}
