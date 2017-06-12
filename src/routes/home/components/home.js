import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import VideoPlayer from 'components/VideoBox/VideoPlayer'
import 'react-html5video/dist/styles.css';

import {Divider, FlatButton, List, ListItem, RaisedButton, TextField} from "material-ui";
import {darkBlack, green500} from 'material-ui/styles/colors';

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

let Active = {
  id: 3
}

let Streams = [
  {
    id : 0,
    user: "Thomas",
    source : {
      url: "http://dl1.webmfiles.org/big-buck-bunny_trailer.webm",
      type: "video/webm"
    }
  },
  {
    id : 1,
    user: "Thomas",
    source : {
      url: "http://localhost:8000/assets/trailer.webm",
      type: "video/webm"
    }
  },
  {
    id : 2,
    user: "Thomas",
    source : {
      url: "http://dl1.webmfiles.org/big-buck-bunny_trailer.webm",
      type: "video/webm"
    }
  },
  {
    id : 3,
    user: "Thomas",
    source : {
      url: "http://localhost:8000/assets/trailer.webm",
      type: "video/webm"
    }
  },
];

const ChatItem = (props) => (
  <div>

    <li className={props.me}>
      <span style={{ color: green500 }}><strong>{props.username}</strong></span>
      : {props.text}
    </li>
  </div>
)

const StreamBox = () => (
  <div>
    <div className="row">
      <div className="col-xl-7 row-eq-height">
        <VideoPlayer autoPlay loop muted>
          <source src="http://localhost:8000/assets/trailer.webm" type="video/webm" />
        </VideoPlayer>
      </div>
      <div className="col-xl-5 row-eq-height">
        <div className="box box-default" style={{width: "100%"}}>
          <div className="box-body chat">
            <div className="row">
              <div className="col-xl-12">
                <ul className="chatBox" style={{ padding: 0}}>
                  <ChatItem className="me" text="Hoi dit is een test" username="Thomas"/>
                  <ChatItem className="me" text="Hoi dit is een test" username="Thomas"/>
                  <ChatItem className="them" text="Hoi dit is een test" username="Thomas"/>
                  <ChatItem className="them" text="Hoi dit is een test" username="Thomas"/>
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
      </div>
    </div>
    <div className="row">
      {Streams.map(stream => {
        return (
          <div className="col-xl-3 " key={stream.id}>
            <VideoPlayer autoPlay loop muted>
              <source src={stream.source.url} type={stream.source.type} />
            </VideoPlayer>
          </div>
        )}
      )}
    </div>
  </div>
);

const Main = () => (
  <div className="row">
    <div className="col-xl-6">
      <VideoPlayer autoPlay loop muted>
        <source src="http://dl1.webmfiles.org/big-buck-bunny_trailer.webm" type="video/webm" />
      </VideoPlayer>
    </div>
    <div className="col-xl-6">
      <VideoPlayer autoPlay loop muted>
        <source src="http://localhost:8000/assets/trailer.webm" type="video/webm" />
      </VideoPlayer>
    </div>
    <div className="col-xl-6">
      <VideoPlayer autoPlay loop muted>
        <source src="http://localhost:8000/assets/trailer.webm" type="video/webm" />
      </VideoPlayer>
    </div>
    <div className="col-xl-6">
      <VideoPlayer autoPlay loop muted>
        <source src="http://dl1.webmfiles.org/big-buck-bunny_trailer.webm" type="video/webm" />
      </VideoPlayer>
    </div>
  </div>
);

class Home extends React.Component {

  componentWillMount() {

  }

  render() {
    const { children, location } = this.props;

    return (
      <div className="main-app-container">
        <Sidenav />

        <section id="page-container" className="app-page-container">
          <Header />

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                <div className="container-fluid no-breadcrumbs">
                  <QueueAnim type="bottom" className="ui-animate">
                    <StreamBox />
                  </QueueAnim>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </section>
      </div>
    );
  }
}

module.exports = Home;
