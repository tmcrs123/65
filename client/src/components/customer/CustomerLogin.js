import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import { styles } from "../../styles/styles";
import axios from "axios";
import palmtree from "../../resources/palmTree.png";

class CustomerLogin extends Component {
  render() {
    return (
      <div className="row center">
        <div className="container">
          <Paper zDepth={4} style={styles.customerLogin.paper}>
            <img src={palmtree} width="100px" />
            <p className="flow-text">
              Login with your favorite service to get started
            </p>
            <RaisedButton
              buttonStyle={{ color: "white" }}
              href="/auth/google"
              primary={true}
              style={styles.customerLogin.button}
            >
              <i className="fa fa-google fa-2x" aria-hidden="true" />
            </RaisedButton>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

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
