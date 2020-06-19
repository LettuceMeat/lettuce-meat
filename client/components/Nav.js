import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav() {
  return (
    <div className="nav lightFontSmall">
      <div className="navLeft">
        <Link to="/">Home</Link>
        <span className="navDivider" />|<span className="navDivider" />
        <Link to="/">Login / Signup</Link>
        <span className="navDivider" />|<span className="navDivider" />
        <Link to="/">Sponsored</Link>
      </div>
      <div className="navRight">
        <Link to="/">Copy Link</Link>
      </div>
    </div>
  )
}
