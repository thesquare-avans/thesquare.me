import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

const Main = () => (
  <div className="row">
    <div className="col-xl-6">
      <div className="box box-default">
        <div className="box-body video">
          <Video autoPlay loop muted controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}>
            <source src="http://localhost:8000/assets/trailer.webm" type="video/webm" />
          </Video>
        </div>
      </div>
    </div>
    <div className="col-xl-6">
      <div className="box box-default">
        <div className="box-body video">
          <Video autoPlay loop muted controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}>
            <source src="http://localhost:8000/assets/trailer.webm" type="video/webm" />
          </Video>
        </div>
      </div>
    </div>
  </div>
)

class Home extends React.Component {
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
                    <Main />
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
