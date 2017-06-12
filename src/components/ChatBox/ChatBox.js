import * as React from "react";
import {Divider, RaisedButton, TextField} from "material-ui";
import {green500} from "material-ui/styles/colors";
import io from 'socket.io-client'
let chatRoom = "0";

let messages = [];

const styles = {
  button : {
    floatingLabelFocusStyle: {
      color: green500,
    },
    underlineStyle: {
      borderColor: green500,
    }
  }
};

let socket = io('ws://localhost:3000');

const ChatItem = (props) => (
  <li className={props.className}>
    <span className="username">{props.username}</span>: {props.text}
  </li>
);

class ChatBox extends React.Component {

  generateUUID () { // Public Domain/MIT
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  handleSubmit(e) {
    let data = {username: "Thomas", message: this.state.chat_text, person: "me", uuid: this.generateUUID()};
    socket.emit("client:new_msg", data);
    this.setState((prevState) => { prevState.messages.push(data) });
    this.setState({chat_text: ""})
  }

  handleTextFieldChange(e) {
    this.setState({chat_text: e.target.value})
  }

  constructor(props) {
    super(props);

    this.state = {
      chat_text: "",
      messages: messages
    }
  }

  componentDidMount() {
    socket.on('server:new_msg', data => {
      this.setState((prevState) => { prevState.messages.push(data) })
    });
  }

  render() {
    return (

      <div className="box box-default" style={{width: "100%"}}>
        <div className="box-body chat">
          <div className="row">
            <div className="col-xl-12">
              <ul className="chatBox" style={{ padding: 0, overflowY: "scroll"}}>
                {this.state.messages.map(msg => {
                  return(
                    <ChatItem className={msg.person} text={msg.message} username={msg.username} key={msg.uuid}/>
                  )
                })}
              </ul>
              <Divider />
              <div className="bottom">
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <TextField
                    floatingLabelText="Chat"
                    style={{width: "70%"}}
                    value={this.state.chat_text}
                    onChange={this.handleTextFieldChange.bind(this)}
                    floatingLabelFocusStyle={styles.button.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.button.underlineStyle} />
                  <RaisedButton label="Send" style={{width: "10%", marginLeft: "20px"}} onTouchTap={this.handleSubmit.bind(this)}/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = ChatBox;
