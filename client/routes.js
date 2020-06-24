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
  NewRoomHome,
  Sponsored
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/asdf" component={Rooms} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/room/:roomId?" component={NewRoomHome} />
        <Route exact path="/room/:roomId?/roomHome" component={RoomMaster} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/chatroom" component={ChatRoom} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/restaurants" component={RestaurantsView} />
            {/* <Route exact path="/roomhome" component={NewRoomHome} /> */}
            {isAdmin && (
              <Switch>
                  <Route exact path="/admin" component={Sponsored} />
              </Switch>
            )}
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
    isAdmin: state.user.isAdmin,
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
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
