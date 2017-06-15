import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import Status from '../../../lib/Status';

let data = {};

const Box = (props) => (
  <div className="col-xl-4">
    <div className="box bg-color-success">
      <div className="box-header box-dark">
        {props.boxTitle} ()
      </div>
      <div className="box-body">

      </div>
    </div>
  </div>
)

const Main = (props) => (
  <div>

  </div>
);

class status extends React.Component {

  constructor(props) {
    super(props);
    localStorage.setItem("status", "");
  }

  componentWillMount() {
    Status.all(function (response) {
      localStorage.setItem("status", response);
    });

    this.setState(data);
    console.log(this.state);
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
                    <div className="row">
                      <Box boxTitle="API" />
                    </div>
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
