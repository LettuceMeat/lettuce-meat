import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {
  AccountCircleTwoTone,
  AddCircleTwoTone,
  BeachAccessTwoTone
} from '@material-ui/icons'
import {useDispatch} from 'react-redux'
import {auth} from '../store'

const LandingPage = () => {
  const [name, setName] = useState()
  const dispatch = useDispatch()

  const create = () => {
    dispatch(auth(null, name, null, 'guest'))
  }

  return (
    <div>
      <img />
      <input onChange={ev => setName(ev.target.value)} />
      <button type="button" onClick={() => create()}>
        create a guest
      </button>
      <div id="icons">
        <Link to="/login" className="icon">
          <AccountCircleTwoTone style={{fontSize: 100, color: 'white'}} /> Sign
          In
        </Link>
        <Link to="/signup" className="icon">
          <AddCircleTwoTone style={{fontSize: 100, color: 'white'}} /> Sign Up
        </Link>
        <Link to="/guest" className="icon">
          <BeachAccessTwoTone style={{fontSize: 100, color: 'white'}} /> Guest
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
