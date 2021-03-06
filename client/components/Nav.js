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
        <Link to="/home">Home</Link>
        <span className="navDivider" />|<span className="navDivider" />
        {user.email ? (
          <span>
            <Link to="/me">{user.email}</Link>
            <span className="navDivider" />|<span className="navDivider" />
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
          </span>
        ) : (
          <>
            <Link to="/login">
              {user.userName ? `(${user.userName}) ` : ''}Login
            </Link>
            <span className="navDivider" />|<span className="navDivider" />
            <Link to="/signup">
              {user.userName ? `(${user.userName}) ` : ''}Signup
            </Link>
          </>
        )}
        {user.isAdmin ? (
          <>
            <span className="navDivider" />|<span className="navDivider" />
            <Link to="/admin">Admin</Link>
          </>
        ) : null}
        <span className="navDivider" />|<span className="navDivider" />
        <Link to="/">About</Link>
      </div>
    </div>
  )
}