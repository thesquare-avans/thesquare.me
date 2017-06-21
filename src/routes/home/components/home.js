import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import VideoPlayer from 'components/VideoBox/VideoPlayer'
import Player from 'components/VideoBox/Player'
import ChatBox from 'components/ChatBox/ChatBox'
import Streams from "../../../lib/Streams"
import TransportSecurity from "../../../lib/TranstportSecurity";
import {hashHistory} from 'react-router';

let Active = {

};

let StreamsArray = [
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
      url: "/assets/download.mp4",
      type: "video/mp4"
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
      url: "http://localhost:8000/assets/d.webm",
      type: "video/webm"
    }
  },
];

let id = 0;

const StreamBox = () => (
  <div>
    <div className="row">
      <div className="col-xl-7 row-eq-height">
        <Player controls={true} mute={false} streamId={0} />
      </div>
      <div className="col-xl-5 row-eq-height">
        <ChatBox stream={"0"} streamId={"dc83e75f-b47a-4793-8232-94ae0f337d91"} streamServer={"http://bart.chat.thesquare.me"}/>
      </div>
    </div>
    <div className="row">
      {StreamsArray.map(stream => {
        id++;
        return (
          <div className="col-xl-3 " key={stream.id}>
            <Player controls={true} mute={false} streamId={id} />
            {/*<VideoPlayer autoPlay loop muted>*/}
              {/*<source src={stream.source.url} type={stream.source.type} />*/}
            {/*</VideoPlayer>*/}
          </div>
        )}
      )}
    </div>
  </div>
);

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      streams: {}
    }
  }

  loadData(res) {
    this.setState({streams: res});
  }

  componentDidMount() {
    TransportSecurity.checkIfUserExists(function (err) {
      if (err) {
        hashHistory.push('/login')
      }
    });

    Streams.all(res => this.loadData(res));
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
