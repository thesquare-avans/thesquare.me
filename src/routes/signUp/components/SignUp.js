import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import {green500} from 'material-ui/styles/colors'

const styles = {
  floatingLabelFocusStyle: {
    color: green500,
  },
  underlineStyle: {
    borderColor: green500,
  }
}

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: APPCONFIG.brand
    };
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
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    type="email"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Password"
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    type="password"
                    fullWidth
                  />
                </div>
                <div className="divider" />
                <div className="form-group">
                  <p className="text-small">By clicking on sign up, you agree to <a href="javascript:;"><i>terms</i></a> and <a href="javascript:;"><i>privacy policy</i></a></p>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <a href="#/login" className="color-gray-light">Login</a>
            <a href="#/" className="color-success">Sign Up</a>
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
          <SignUp />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;
