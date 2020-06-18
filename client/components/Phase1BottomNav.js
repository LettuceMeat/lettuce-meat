import React from 'react'
import {NavLink} from 'react-router-dom'

const Phase1BottomNav = () => {
  return (
    <div>
      <nav className="bottomNav">
        <NavLink exact to="/chatroom">
          Chat
        </NavLink>
        <NavLink exact to="/preferences">
          Preferences
        </NavLink>
      </nav>
      <hr />
    </div>
  )
}

export default Phase1BottomNav
