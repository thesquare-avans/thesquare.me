import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import VideoPlayer from 'components/VideoBox/VideoPlayer'
import ReactHLS from 'components/VideoBox/HLSSource'
import ChatBox from 'components/ChatBox/ChatBox'
import 'react-html5video/dist/styles.css';
import Streams from "../../../lib/Streams"
// import ReactHLS from 'react-hls';

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
        <ReactHLS autoplay looped url={"https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"} />
        {/*<ReactHLS autoplay url={"https://video-edge-c61bc8.ams02.hls.ttvnw.net/v0/CvoBCOaCBbuKbzqIX-7hbrsyo6L99UDfKJ7c-22ZMvmF2ws_8htFEUOh_cJzaRPR0HzZKSfnFQozSDeoMdnk5p_1CSHchBJciNss4C6rVS1w69ramf2axOShJQAIJRVwCMAxarvA1nSpR9p8-rM5RmvKpC3n6LK0tCoGGTtZ6dm2BJwMUoIvM7G6jgtWldpsyrX8IZ9iggA2OLRD9v4E8nAJTX_yrweTYRzhoh1o-yhbFaikuHdyUg9CFNevX3hn8aKEnWnerJxFW8Qx7GuorDIA0lgeTUQcIvIoYgHZOq47l835G0BkbHZ4ue-6CtqC-UgfMAHQPTXog5sg7hIQs3HFZPFwnJPRb8lF_4sbMBoMPWZHXRLxarp2gd1M/index-live.m3u8"} />*/}
      </div>
      <div className="col-xl-5 row-eq-height">
        <ChatBox streamId={1}/>
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
