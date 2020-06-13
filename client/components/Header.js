import React from 'react'
import logo from '../../public/img/logo.jpg'

export default function Header() {
  return (
    <div className="header">
      <div className="logoDiv logoFont">
        <img src={logo} alt="" height="48" />
        <span className="spacer" />
        Lettuce Meat
      </div>
      <div className="roomDiv">ABCD</div>
    </div>
  )
}
