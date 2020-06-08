import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {
  AccountCircleTwoTone,
  AddCircleTwoTone,
  BeachAccessTwoTone
} from '@material-ui/icons'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>LETTUCE MEAT</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <AccountCircleTwoTone style={{fontSize: 50, color: 'black'}} />{' '}
            Login
          </Link>
          <Link to="/signup">
            <AddCircleTwoTone style={{fontSize: 50, color: 'black'}} /> Sign Up
          </Link>
          <Link to="/guest">
            <BeachAccessTwoTone style={{fontSize: 50, color: 'black'}} /> Guest
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
