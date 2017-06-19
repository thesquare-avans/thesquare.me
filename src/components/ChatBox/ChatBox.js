import * as React from "react";
import {Divider, RaisedButton, TextField} from "material-ui";
import {green500} from "material-ui/styles/colors";
import io from 'socket.io-client';

let messages = [];

let user = null;

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
    e.preventDefault();
    if(this.state.chat_text.length !== 0){
      let data = {username: JSON.parse(localStorage.getItem("user")).name, message: this.state.chat_text, person: "me", uuid: this.generateUUID()};
      socket.emit("client:new_msg", data);
      let item = (<ChatItem className={data.person} text={data.message} username={data.username} key={data.uuid}/>);

      this.setState((prevState) => { prevState.messages.push(item)});
      this.setState({chat_text: ""})
    }
    //this.scrollToBottom(item)
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
      let item = (<ChatItem className={data.person} text={data.message} username={data.username} key={data.uuid}/>);
      this.setState((prevState) => { prevState.messages.push(item) });
    });
  }

  render() {
    return (

      <div className="box box-default" style={{width: "100%"}}>
        <div className="box-body chat">
          <div className="row">
            <div className="col-xl-12">
              <ul className="chatBox" style={{ padding: 0, overflowY: "scroll" }}>
                {this.state.messages.map(msg => { return(msg) })}
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
                  <RaisedButton label="Send" disabled={this.state.chat_text.length === 0} style={{width: "10%", marginLeft: "20px"}} onTouchTap={this.handleSubmit.bind(this)}/>
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
