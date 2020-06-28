/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import React, {useState} from 'react'
import history from '../history'
import Button from '@material-ui/core/Button'
import axios from 'axios'

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState('')
  const [error, setError] = useState('')

  const checkInput = (value) => {
    if (/^[a-zA-Z]*$/g.test(value)) setRoomCode(value.toUpperCase())
  }

  const join = async() => {
      const roomCheck = (await axios.get(`/api/room/${roomCode}`)).data
      if (roomCheck.length) history.push(`/room/${roomCode.toUpperCase()}/roomHome`)
      else setError('invailid room code')
  }

  return (
    <div className='mainContainer'>
      <input className="darkFont" type="text" maxLength="4" value={roomCode} onChange={ev => checkInput(ev.target.value)} />
      <div>{error}</div>
      <Button type="button" onClick={() => join()}>
        join room
      </Button>
    </div>
  )
}
