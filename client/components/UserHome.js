import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import {thunkUpdateUser} from '../store/user'
//import { UniqueConstraintError } from 'sequelize/types'
import { thunkLoadAllMessages } from '../store/thunks'

class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      email: '',
      password: ''
    }

    this.updateUser = this.updateUser.bind(this)
  }
  componentDidMount() {
    this.props.loadMessages()
  }

  async updateUser(ev) {
    ev.preventDefault()
    try {
      await this.props.update({
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        id: this.props.user.id
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {userName, email, password} = this.state
    const {messages, user} = this.props
    const {updateUser} = this
    return (
      <div>
        <div>
          <h3 id='welcome'>Welcome {user.userName}!</h3>
        </div>
        <div id='userHomeWrapper'>
          <div id='roomCardDiv'>
            <h5>go to old rooms</h5>
            <div id='roomCardWrapper'>
              {/* <Container maxWidth="sm" style={{margin: 0}}> */}
                {messages && messages.map(message =>  {
                  return (
                    <div className='roomCard' key={message.id}><a href={`/room/${message.roomName}/roomHome`} >{message.roomName}</a></div>
                  )
                })}
              {/* </Container> */}
            </div>
          </div>
          <div>
            <h5>update your profile</h5>
            <form onSubmit={ updateUser } id='userUpdateForm'> 
              <TextField id="standard-basic" label="username" value={userName}
                onChange={ev => this.setState({userName: ev.target.value})} />
              <TextField id="standard-basic" label="email" value={email}
                onChange={ev => this.setState({email: ev.target.value})} />
              <TextField id="standard-basic" type='password' label="password" value={password}
                onChange={ev => this.setState({password: ev.target.value})} />
              <button>update</button>
            </form>
          </div>
        </div>
      </div>

    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    email: state.user.email,
    messages: state.messages.filter(message => message.content.includes(`${state.user.userName} has joined the room`))
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadMessages() {
      dispatch(thunkLoadAllMessages())
    },
    update: user => dispatch(thunkUpdateUser(user))

  }
}

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
