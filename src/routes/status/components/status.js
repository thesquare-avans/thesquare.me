import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import Status from '../../../lib/Status';

const Main = (props) => (
  <div>
    <div className="row">
      <div className="col-xl-6">

      </div>
    </div>
  </div>
);

class status extends React.Component {

  render() {
    const { children, location } = this.props;

    Status.all(function (data) {
      console.log(data);
    });

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

module.exports = status;
