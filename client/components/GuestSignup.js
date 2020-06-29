import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {auth} from '../store'
import Button from '@material-ui/core/Button'


export default function GuestSignup() {
  const [name, setName] = useState()
  const dispatch = useDispatch()

  const create = () => {
    dispatch(auth(null, name, null, 'guest'))
  }

  return (
    <div className="mainContainer">
      <input className="darkFont" onChange={ev => setName(ev.target.value)} />
      <Button type="button" onClick={() => create()}>
        create a guest
      </Button>
    </div>
  )
}
