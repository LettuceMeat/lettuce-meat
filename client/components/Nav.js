import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout} from '../store'

export default function Nav() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const match = useRouteMatch('/room/:roomId')
  const roomId = match ? match.params.roomId : null
  return (
    <div className="nav lightFontSmall">
      <div className="navLeft">
        <Link to="/">Home</Link>
        <span className="navDivider" />|<span className="navDivider" />
        {user.email ? (
          <span>
            <Link to="/">{user.email}</Link>
            <span className="navDivider" />|<span className="navDivider" />
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </span>
        ) : (
          <Link to="/login">Login / Signup</Link>
        )}
        <span className="navDivider" />|<span className="navDivider" />
        <Link to="/">Sponsored</Link>
      </div>
      <div className="navRight">{roomId && <Link to="/">Copy Link</Link>}</div>
    </div>
  )
}
