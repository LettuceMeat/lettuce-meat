import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// import Link from '@material-ui/core/Link'

/**
 * COMPONENT
 */

const useStyles = makeStyles({
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 5
  }
})
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const styles = useStyles()

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email" className={styles.label}>
            <small>Email</small>
          </label>
          <div className={styles.label}>
            <TextField
              id="standard-email-input"
              label="Email"
              variant="outlined"
              name="email"
              type="text"
              margin="dense"
            />
          </div>
        </div>

        <div>
          <label htmlFor="userName" className={styles.label}>
            <small>User Name</small>
          </label>
          <div className={styles.label}>
            <TextField
              id="standard-userName-input"
              label="userName"
              variant="outlined"
              name="userName"
              type="text"
              margin="dense"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className={styles.label}>
            <small>Password</small>
          </label>
          <div className={styles.label}>
            <TextField
              id="standard-password-input"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              margin="dense"
            />
          </div>
        </div>
        <div className={styles.label}>
          <Button type="submit" color="primary">
            {displayName}
          </Button>
          {/* <button type="submit">{displayName}</button> */}
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <Link href="/auth/google" component="button" variant="body2">
        {displayName} with Google
      </Link> */}
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const userName = evt.target.userName.value
      const password = evt.target.password.value
      dispatch(auth(email, userName, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
