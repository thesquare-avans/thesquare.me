import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import VideoPlayer from 'components/VideoBox/VideoPlayer'
import 'react-html5video/dist/styles.css';

import TransportSecurity from "../../../lib/TranstportSecurity"
import {Divider, FlatButton, List, ListItem, RaisedButton, TextField} from "material-ui";
import {darkBlack, green500} from 'material-ui/styles/colors';

const styles = {
  floatingLabelFocusStyle: {
    color: green500,
  },
  underlineStyle: {
    borderColor: green500,
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
  <ListItem
    disableKeyboardFocus={true}
    secondaryTextLines={2}
    secondaryText={
      <p>
        {props.me && <span style={{color: darkBlack}}><strong>{props.user}</strong></span>}
        {!props.me && <span style={{color: darkBlack}}>{props.user}</span>}
        : {props.message}
      </p>
    }
  />
)

const StreamBox = () => (
  <div>
    <div className="row">
      <div className="col-xl-6 offset-1">
        <VideoPlayer autoPlay loop muted>
          <source src="http://localhost:8000/assets/trailer.webm" type="video/webm" />
        </VideoPlayer>
      </div>
      <div className="col-xl-3">
        <div className="box box-default">
          <div className="box-body chat">
            <div className="row">
              <List>
                <ChatItem me={false} user="Thomas" message="Hai"/>
                <ChatItem me={true} user="Thomas" message="Hai"/>
              </List>
            </div>
            <Divider/>
            <div className="row">
              <div className="col-xl-12">
                <TextField
                  fullWidth
                  floatingLabelText="Chat"
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underlineStyle} />
                <div className="pull-right">
                  <FlatButton label="Send"/>
                </div>
              </div>
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
                <div className="container-fluid no-breadcrumbs page-dashboard">
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
