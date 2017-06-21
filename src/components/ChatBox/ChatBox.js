import * as React from "react";
import {Divider, RaisedButton, TextField} from "material-ui";
import {green500} from "material-ui/styles/colors";
import io from 'socket.io-client';
import TransportSecurity from "../../lib/TranstportSecurity";
import axios from 'axios';

const BASE_URL = "http://api.thesquare.me/v1";

let stream = null;

let messages = [];

let user = null;
let cachedUsers = [];
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
    this.server = io(props.streamServer);

    stream = props.streamId
    //this.connect();

    this.state = {
      chat_text: "",
      count: 0,
      messages: messages
    }
  }

  identify(callback) {
    let message = TransportSecurity.signMessage({
      publicKey: btoa(localStorage.getItem("publicKey"))
    });

    this.server.emit('identify', message, data => {
      let payload = TransportSecurity.verifyMessage(data);

      if(payload && payload.success) {
        return callback();
      } else {
        return callback(new Error())
      }
    });
  }

  join(callback) {
    let message = TransportSecurity.signMessage({
      room: stream
    });

    this.server.emit('join', message, data => {
      let payload = TransportSecurity.verifyMessage(data);

      if(payload && payload.success) {
        return callback(payload)
      }
    });
  }

  sendOwnMessage(msg) {
    let item = (<ChatItem className="me" text={msg} username="You" key={messages.length + 1}/>);

    this.setState((prevState) => { prevState.messages.push(item)});
    this.setState({chat_text: ""})
  }

  sendMessage(msg) {
    let message = TransportSecurity.signMessage({
      room: stream,
      message: msg
    });

    this.server.emit('message', message);
    this.sendOwnMessage(msg);
  }

  reciveMessage(data, user) {
    let pl = TransportSecurity.verifyMessage(user);
    if(pl && pl.success) {
      let message = TransportSecurity.verifyMessageExternal(data.data.data, pl.user.publicKey);
      let item = (<ChatItem className="them" text={message.message} username={pl.user.name} key={messages.length + 1}/>);
      this.setState((prevState) => { prevState.messages.push(item) });
      // if(this.state.messages.length >= 20 ) {
      //   this.state.messages.shift();
      // }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.chat_text.length !== 0){
      this.sendMessage(this.state.chat_text);
      this.setState({count: 0})
    }
  }

  handleTextFieldChange(e) {
    if(e.target.value.length <= 150) {
      this.setState({chat_text: e.target.value})
    }

    this.setState({count: e.target.value.length});
  }

  componentDidMount() {
    this.identify(function (err) {
      if(err) {
        console.log(err);
      }
    });

    this.join(function (payload) {
      //console.log(payload);
    });

    this.server.on('message', data => {
      let payload = TransportSecurity.verifyMessage(data);
      if(payload && payload.success) {
        if(cachedUsers[payload.data.sender]) {
          this.reciveMessage(payload, cachedUsers[payload.data.sender])
        }

        let config = {
          headers: {
            'X-PublicKey': btoa(localStorage.getItem("publicKey")),
            'Content-Type': "application/json; charset=utf-8"
          },
        };

        let request = axios.get(`${BASE_URL}/users/${payload.data.sender}`, config);

        request.then(res => this.reciveMessage(payload, res.data));

        request.catch(function(error) {
          throw error;
        });
      }

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
                  <p>{this.state.count} characters left</p>
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
