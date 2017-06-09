import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import {green500} from 'material-ui/styles/colors';

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
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand,
      username: ""
    };
  }

  componentWillUnmount() {
    if(this.state.username !== "" && localStorage.getItem("name") === null) {
      localStorage.setItem("name", this.state.username);
    }
  }

  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">

            <section className="logo text-center">
              <img src="../../assets/react.svg" height="200" width="200" alt="Logo" />
            </section>

            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Username"
                    value={this.state.username}
                    onChange={e => this.setState({ username: e.target.value })}
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    fullWidth
                  />
                </div>

              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a href="#/" className="color-success" onClick={
              (e) => {

              }
            }>Explore</a>
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
