import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export default function(ComposedComponent) {
  class AdminAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated.isAdmin) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth };
  }

  return connect(mapStateToProps, null)(withRouter(AdminAuthentication));
}
