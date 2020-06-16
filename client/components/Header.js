import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import logo from '../../public/img/logo.jpg'

export default function Header() {
  const match = useRouteMatch('/room/:roomId')
  const roomId = match ? match.params.roomId : null
  return (
    <div className="header">
      <div className="logoDiv logoFont">
        <img src={logo} alt="" height="48" />
        <span className="spacer" />
        Lettuce Meat
      </div>
      {roomId && <div className="roomDiv">{`${roomId.toUpperCase()}`}</div>}
    </div>
  )
}
