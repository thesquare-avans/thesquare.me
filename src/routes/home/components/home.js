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

const StreamBox = () => (
  <div>
    <div className="row">
      <div className="col-xl-7 row-eq-height">
        <Player controls={true} mute={false} streamId={"0"} />
        {/*<ReactHLS url={"https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"} />*/}
        {/*<ReactHLS autoplay url={"https://video-edge-c61bc8.ams02.hls.ttvnw.net/v0/CvoBCOaCBbuKbzqIX-7hbrsyo6L99UDfKJ7c-22ZMvmF2ws_8htFEUOh_cJzaRPR0HzZKSfnFQozSDeoMdnk5p_1CSHchBJciNss4C6rVS1w69ramf2axOShJQAIJRVwCMAxarvA1nSpR9p8-rM5RmvKpC3n6LK0tCoGGTtZ6dm2BJwMUoIvM7G6jgtWldpsyrX8IZ9iggA2OLRD9v4E8nAJTX_yrweTYRzhoh1o-yhbFaikuHdyUg9CFNevX3hn8aKEnWnerJxFW8Qx7GuorDIA0lgeTUQcIvIoYgHZOq47l835G0BkbHZ4ue-6CtqC-UgfMAHQPTXog5sg7hIQs3HFZPFwnJPRb8lF_4sbMBoMPWZHXRLxarp2gd1M/index-live.m3u8"} />*/}
      </div>
      <div className="col-xl-5 row-eq-height">
        <ChatBox stream={"0"} streamId={"dc83e75f-b47a-4793-8232-94ae0f337d91"} streamServer={"http://bart.chat.thesquare.me"}/>
      </div>
    </div>
    <div className="row">
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
