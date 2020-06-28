import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {auth} from '../store'


export default function GuestSignup() {
  const [name, setName] = useState()
  const dispatch = useDispatch()

  const create = () => {
    dispatch(auth(null, name, null, 'guest'))
  }

  return (
    <div>
      <input onChange={ev => setName(ev.target.value)} />
      <button type="button" onClick={() => create()}>
        create a guest
      </button>
    </div>
  )
}
