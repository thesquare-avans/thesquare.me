import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import {green500} from 'material-ui/styles/colors';
import {hashHistory} from 'react-router'

import TransportSecurity from "../../../lib/TranstportSecurity"

const styles = {
  floatingLabelFocusStyle: {
    color: green500,
  },
  underlineStyle: {
    borderColor: green500,
  }
};

class Login extends React.Component {

  loadConfig(event) {
    event.preventDefault();
    document.getElementById('configSelector').click();
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      let file = event.target.files[0];

      if(file) {
        let reader = new FileReader();

        reader.onload = (function (loadEvent) {
          try {
            let contents = JSON.parse(loadEvent.target.result);
          } catch (e) {
            if(e) {
              return alert("Invalid config file");
            }
          }

          localStorage.setItem("user", contents.user);
          localStorage.setItem("publicKey", contents.publicKey);
          localStorage.setItem("privateKey", contents.privateKey);

          TransportSecurity.checkIfUserExists(function (err) {
            if (err) {
              console.log("There was a error");
            } else {
              hashHistory.push('/home')
            }
          });
        });

        reader.readAsText(file);
      }
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  }

  handleSubmit(event) {
    if (!TransportSecurity.checkIfUserExists()) {
      if (this.state.username !== "") {
        localStorage.setItem("name", this.state.username)
        TransportSecurity.generateKeys(function (e) {
          hashHistory.push('/home')
        });
      }
    } else
      TransportSecurity.checkIfUserExists(function (err) {
        if (!err) {
          hashHistory.push('/home')
        }
      });
  }

  constructor() {
    super();

    if (TransportSecurity.checkIfUserExists()) {
      TransportSecurity.checkIfUserExists(function (err) {
        if(!err) {
          hashHistory.push("/home")
        }
      })
    } else {
      this.state = {
        brand: APPCONFIG.brand,
        username: ""
      };
    }
  }

  componentWillMount() {
    TransportSecurity.checkIfUserExists(function (err) {
      if (err) {
        console.log("There was a error");
      } else {
        hashHistory.push('/home')
      }
    });
  }

  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">

            <section className="logo text-center">
              <img src="../../assets/react.svg" height="200" width="200" alt="Logo"/>
            </section>

            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Username"
                    value={this.state.username}
                    onChange={e => this.setState({username: e.target.value})}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    fullWidth
                  />
                </div>

              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a href="#/" className="color-success" onClick={this.handleSubmit.bind(this)}>Explore</a>
            {/*<input className="color-success" type="file" onClick={this.loadConfig.bind(this)} name="config" id="configSelector">Load Config</input>*/}
            <input id="configSelector" type="file" name="config" style={{display: "none"}} />
            <a href="#/" className="color-success" onClick={this.loadConfig.bind(this)}>Load Config</a>
          </div>
        </div>
      </div>
    );
  }
}

const Page = () => (
  <div className="page-login">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <Login />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;
