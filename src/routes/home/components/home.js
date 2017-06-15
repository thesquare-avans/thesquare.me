import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import VideoPlayer from 'components/VideoBox/VideoPlayer'
import ChatBox from 'components/ChatBox/ChatBox'
import 'react-html5video/dist/styles.css';
import Streams from "../../../lib/Streams"
import ReactHLS from 'react-hls';

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

const StreamBox = () => (
  <div>
    <div className="row">
      <div className="col-xl-7 row-eq-height">
        <ReactHLS url={"https://video-edge-c67f00.fra02.hls.ttvnw.net/v0/CuwBJiGQZKF12q9PuBOmE3PUmpsL16oJJm9FhyeZGtXYdG_-muC_07SrJka65G343_Qv77DWw1sSFT8Z8py4llgEMgY_zHpn7TYqz0l_KVeQfLsj9ofg4T1sC_G_9E4-a-Yxel6jW6Z6iybNyj7UTwjn5R_QrZvNarIhcqQtVFV-WcKkmg0DhDTetJBOqpGpvo0JjaTLvU1Vm_Z0ua9-PInG2J5o-VXjO8Fqw7lDKVCB9qna8DMMKAL1onSRMqxC3nLL65Qe5ay_v4aiCvHfYSZc0D6GNhy0qRmoU8SedQVvVOOY_3CwQyX_qP7vu_kSEN6T7rsHfIOpABT6KwiWKB4aDBpVyoC_PmLO7pBK8A/index-live.m3u8"} />
      </div>
      <div className="col-xl-5 row-eq-height">
        <ChatBox />
      </div>
      {StreamsArray.map(stream => {
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

class Home extends React.Component {

  componentWillMount() {

  }

  render() {
    const { children, location } = this.props;

    Streams.all(function (streams) {
      console.log(streams);
    })

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
