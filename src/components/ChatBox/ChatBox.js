import * as React from "react";
import {Divider, RaisedButton, TextField} from "material-ui";
import {green500} from "material-ui/styles/colors";
import io from 'socket.io-client'
let chatRoom = "0"

let messages = [
  {username: "Thomas", message: "Hoi", uuid: "0"},
  {username: "Thomas", message: "Hoi", uuid: "0"},
  {username: "Thomas", message: "Hoi", uuid: "0"},
];

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

const ChatItem = (props) => (
  <li className={props.className}>
    <span className="username">{props.username}</span>: {props.text}
  </li>
);

class ChatBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: messages
    }
  }

  componentDidMount() {
    let socket = io('ws://localhost:3000');

    socket.on('server:new_msg', data => {
      messages.push(data);
      this.setState.messages = messages;
    });
  }

  render() {
    return (

      <div className="box box-default" style={{width: "100%"}}>
        <div className="box-body chat">
          <div className="row">
            <div className="col-xl-12">
              <ul className="chatBox" style={{ padding: 0}}>
                {this.state.messages.map(msg => {
                  return(
                    <ChatItem className="me" text={msg.message} username={msg.username}/>
                  )
                })}
              </ul>
              <Divider />
              <div className="bottom">
                <TextField
                  floatingLabelText="Chat"
                  className="input-chat"
                  style={{width: "70%"}}
                  floatingLabelFocusStyle={styles.button.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.button.underlineStyle} />
                <RaisedButton label="Send" style={{width: "10%", marginLeft: "20px"}}/>
              </div>
            </div>
          </div>
          <div className="row">

          </div>
        </div>
      </div>

    )
  }
}

module.exports = ChatBox;
