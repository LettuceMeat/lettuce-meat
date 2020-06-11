import React from 'react'
import {Link} from 'react-router-dom'
import {
  AccountCircleTwoTone,
  AddCircleTwoTone,
  BeachAccessTwoTone
} from '@material-ui/icons'

const LandingPage = () => {
  return (
    <div id="landingPageWrapper">
      <img />
      <div id="icons">
        <Link to="/login" className="icon">
          <AccountCircleTwoTone style={{fontSize: 50, color: 'white'}} /> Sign
          In
        </Link>
        <Link to="/signup" className="icon">
          <AddCircleTwoTone style={{fontSize: 50, color: 'white'}} /> Sign Up
        </Link>
        <Link to="/guest" className="icon">
          <BeachAccessTwoTone style={{fontSize: 50, color: 'white'}} /> Guest
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
