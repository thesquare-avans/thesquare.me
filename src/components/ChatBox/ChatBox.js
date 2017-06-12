import * as React from "react";
import {Divider, RaisedButton, TextField} from "material-ui";
import {green500} from "material-ui/styles/colors";

let chatRoom = "0"

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
    <span className="username">{props.username}</span>
    : {props.text}
  </li>
);

class ChatBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div className="box box-default" style={{width: "100%"}}>
        <div className="box-body chat">
          <div className="row">
            <div className="col-xl-12">
              <ul className="chatBox" style={{ padding: 0}}>
                <ChatItem className="them" text="Hoi dit is een test" username="Thomas"/>
                <ChatItem className="me" text="Hoi dit is een test" username="Thomas"/>
                <ChatItem className="them" text="Hoi dit is een test" username="Thomas"/>
                <ChatItem className="me" text="Hoi dit is een test" username="Thomas"/>
                <ChatItem className="them" text="Hoi dit is een test" username="Thomas"/>
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
