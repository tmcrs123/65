import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export default function(ComposedComponent) {
  class AdminAuthentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated.isAdmin) {
        console.log("redirecting");
        this.props.history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    console.log("state in mstp", state);
    return { authenticated: state.adminAuth };
  }

  return connect(mapStateToProps, null)(withRouter(AdminAuthentication));
}
