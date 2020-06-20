import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Header,
  LandingPage,
  RestaurantsView,
  HomePage,
  Rooms,
  ChatRoom,
  RoomMaster,
  NewRoomHome
} from './components'
import {me} from './store'
import {thunkLoadMessages} from './store/thunks'
import {createMessage} from './store/actions'
// import socket from './socket'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    // socket.on('message', message => {
    //   //no need to use thunk
    //   this.props.createNewMessage(message)
    // })
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/room/:roomId?" component={RoomMaster} />
        <Route exact path="/home" component={HomePage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/restaurants" component={RestaurantsView} />
            <Route exact path="/chatroom" component={ChatRoom} />
            <Route exact path="/roomhome" component={NewRoomHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    createNewMessage: message => {
      dispatch(createMessage(message))
    },
    loadInitialData() {
      dispatch(me())
      dispatch(thunkLoadMessages())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
