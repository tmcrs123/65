import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import { styles } from "../../styles/styles";
import axios from "axios";

class CustomerLogin extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s4 offset-s4">
          <Paper
            zDepth={4}
            className="center-align"
            style={styles.customerLogin.paper}
          >
            <h2>Welcome!</h2>
            <p>Login with your favorite service to get started</p>
            <RaisedButton
              buttonStyle={{ color: "white" }}
              href="/auth/google"
              primary={true}
              style={styles.customerLogin.button}
            >
              <i class="fa fa-google fa-2x" aria-hidden="true" />
            </RaisedButton>

            <RaisedButton
              href="/auth/facebook"
              secondary={true}
              buttonStyle={{ color: "white" }}
              style={styles.customerLogin.button}
            >
              <i className="fa fa-facebook-official fa-2x" aria-hidden="true" />
            </RaisedButton>
          </Paper>
        </div>
      </div>
    );
  }
}

export default CustomerLogin;
