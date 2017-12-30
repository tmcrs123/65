import React, { Component } from "react";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <h1>I'm a landing page</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(null, null)(Landing);
