import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import Status from "../../../lib/Status";

const Box = (props) => (
  <div className="col-xl-4">
    {props.data.status === "green" &&
    <div className="box bg-color-success table-box">
      <div className="box-header box-dark">
        {props.boxTitle} ({props.data.count || 0})
      </div>
      <div className="box-body">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Response Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {props.data.nodes.map(node => (
              <tr key={node.id}>
                <td>{node.id}</td>
                <td>{node.averageResponseTime} ms</td>
                <td>{node.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    }
    {props.data.status === "yellow" &&
    <div className="box bg-color-warning">
      <div className="box-header box-dark">
        {props.boxTitle} ({props.data.count || 0})
      </div>
      <div className="box-body">
        <table className="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Response Time</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          {props.data.nodes.map(node => (
            <tr key={node.id}>
              <td>{node.id}</td>
              <td>{node.averageResponseTime} ms</td>
              <td>{node.status}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
    }
    {props.data.status === "red" &&
    <div className="box bg-color-danger">
      <div className="box-header box-dark">
        {props.boxTitle} ({props.data.count || 0})
      </div>
      <div className="box-body">
        <table className="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Response Time</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          {props.data.nodes.map(node => (
            <tr key={node.id}>
              <td>{node.id}</td>
              <td>{node.averageResponseTime} ms</td>
              <td>{node.status}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
    }
  </div>
);

class status extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status : {api: {}, chat: {}, streaming: {}}
    }
  }

  loadData(res) {
    this.setState(res);
  }

  componentDidMount() {
    Status.all(res => this.loadData(res));
  }

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
                    <div className="row">
                      <Box boxTitle="API" data={this.state.status.api}/>
                      <Box boxTitle="CHAT" data={this.state.status.chat}/>
                      <Box boxTitle="STREAMING" data={this.state.status.streaming}/>
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
