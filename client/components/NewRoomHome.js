import React, {Component} from 'react'
import history from '../history'
import Button from '@material-ui/core/Button'

export default class NewRoomHome extends Component {
  copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand('copy')
  }

  goToRoomHome = () => {
    const roomId = this.props.match.params.roomId
    history.push(`/room/${roomId}/roomHome`)
  }

  render() {
    const roomId = this.props.match.params.roomId
    return (
      <div className="mainContainer">
            <textarea className="darkFont"
              ref={textarea => {this.textArea = textarea}}
              value={`lettucemeat.app/room/${roomId}/roomHome`}
              readOnly={true}
            />
          <Button onClick={() => this.copyCodeToClipboard()}>
            copy to clipboard
          </Button>
          <Button onClick={() => this.goToRoomHome()}>go to room</Button>
      </div>
    )
  }
}
