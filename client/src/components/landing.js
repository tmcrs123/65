import React, { Component } from "react";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    console.log("start rendering landing page");
    return (
      <div className="container">
        <h1>I'm a landing page</h1>
      </div>
    );
    console.log("finish rendering landing page");
  }
}

export default connect(null, null)(Landing);
