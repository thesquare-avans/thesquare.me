import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import VideoPlayer from 'components/VideoBox/VideoPlayer'
import ChatBox from 'components/ChatBox/ChatBox'
import 'react-html5video/dist/styles.css';
import Streams from "../../../lib/Streams"

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
        <VideoPlayer autoPlay loop muted>
          <source src="http://localhost:8000/assets/trailer.webm" type="video/webm" />
        </VideoPlayer>
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
