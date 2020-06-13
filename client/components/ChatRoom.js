import React, {useState} from 'react'
import {connect} from 'react-redux'
import {thunkCreateMessage} from '../store/thunks'

export const ChatRoom = props => {
  const {messages} = props
  const [content, setText] = useState('')

  return (
    <div>
      <form
        onSubmit={ev => {
          ev.preventDefault()
          props.createMessage(content)
          setText('')
        }}
      >
        <input value={content} onChange={ev => setText(ev.target.value)} />
      </form>
      <ul>
        {messages
          ? messages.map(message => {
              return (
                <li key={message.id}>
                  {message.content} - {message.user.firstName}
                </li>
              )
            })
          : null}
      </ul>
    </div>
  )
}

const mapState = state => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createMessage: content => dispatch(thunkCreateMessage({content}))
  }
}

export default connect(mapState, mapDispatchToProps)(ChatRoom)
