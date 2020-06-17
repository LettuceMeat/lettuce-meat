import React, {Component} from 'react'

export default class NewRoomHome extends Component {
  copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand('copy')
  }
  render() {
    return (
      <div id="codeHomeWrapper">
        <div id="roomCodeContainer">
          <div>
            <h1>here's your room code:</h1>
          </div>
          <div>
            <textarea
              ref={textarea => (this.textArea = textarea)}
              value="www.lettuce-meat.com/ROOMCODE"
              readOnly={true}
            />
          </div>
          <button onClick={() => this.copyCodeToClipboard()}>
            copy to clipboard
          </button>
          <button>go to room</button>
        </div>
      </div>
    )
  }
}
