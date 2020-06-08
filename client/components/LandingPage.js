import React from 'react'
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
        <a href="/signin" className="icon">
          <AccountCircleTwoTone style={{fontSize: 50, color: 'white'}} /> Sign
          In
        </a>
        <a href="/signup" className="icon">
          <AddCircleTwoTone style={{fontSize: 50, color: 'white'}} /> Sign Up
        </a>
        <a href="/guest" className="icon">
          <BeachAccessTwoTone style={{fontSize: 50, color: 'white'}} /> Guest
        </a>
      </div>
    </div>
  )
}

export default LandingPage
