import React, {useState} from 'react'
import {connect} from 'react-redux'
import {thunkCreateMessage} from '../store/thunks'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  inputBox: {
    width: '100%',
    backgroundColor: 'rgb(248, 248, 248)'
  }
}))

export const ChatRoom = props => {
  const classes = useStyles()
  const {messages, loggedUser} = props
  const [content, setText] = useState('')

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{backgroundColor: '#cfe8fc'}}>
          <div id="chatBox">
            <ul className="chatList">
              {messages
                ? messages.map(message => {
                    return (
                      <li
                        key={message.id}
                        className={
                          loggedUser.id === message.userId
                            ? 'textRight'
                            : 'textLeft'
                        }
                      >
                        {message.content} -{' '}
                        {
                          //message.user.firstName
                        }
                      </li>
                    )
                  })
                : null}
            </ul>
            <form
              onSubmit={ev => {
                ev.preventDefault()
                props.createMessage(content)
                setText('')
              }}
            >
              <TextField
                className={classes.inputBox}
                id="outlined-basic"
                label="chat"
                variant="outlined"
                value={content}
                onChange={ev => setText(ev.target.value)}
                id="textBox"
              />
            </form>
          </div>
        </Typography>
      </Container>
    </React.Fragment>
  )
}

const mapState = state => {
  return {
    messages: state.messages,
    loggedUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createMessage: content => dispatch(thunkCreateMessage({content}))
  }
}

export default connect(mapState, mapDispatchToProps)(ChatRoom)