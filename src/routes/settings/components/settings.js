import React from 'react';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import QueueAnim from 'rc-queue-anim';
import {RaisedButton} from "material-ui";
import {hashHistory} from "react-router";

class settings extends React.Component {

  deleteIdentity() {
    confirm("Are you sure?", () => {
      localStorage.removeItem("name");
      localStorage.removeItem("privateKey");
      localStorage.removeItem("publicKey");
      localStorage.removeItem("user");

      hashHistory.push("/login");
    });
  }

  downloadConfig(){
    if(!localStorage.getItem("user") || !localStorage.getItem("publicKey") || !localStorage.getItem("privateKey")) {
      return alert("Can not save config, information missing");
    }

    let data = {
      user: localStorage.getItem("user"),
      privateKey: localStorage.getItem("privateKey"),
      publicKey: localStorage.getItem("publicKey")
    };

    let element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8,"+encodeURIComponent(JSON.stringify(data, null, 4)));
    element.setAttribute("download", "thesquare-config.json");

    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  componentWillMount() {

  }

  componentDidMount() {

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
                    <div className="col-xl-6">
                      <div className="box box-default">
                        <div className="box-header">
                          User Account
                        </div>
                        <div className="box-body">
                          <RaisedButton label="Download Identity" style={{margin: 5}} onTouchTap={this.downloadConfig.bind(this)}/>
                          <RaisedButton label="Delete Identity" style={{margin: 5}} onTouchTap={this.deleteIdentity.bind(this)}/>
                        </div>
                      </div>
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

module.exports = settings;
