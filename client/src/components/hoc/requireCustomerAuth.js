import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";

export default function(ComposedComponent) {
  class CustomerAuthentication extends Component {
    componentWillReceiveProps(nextProps) {
      if (_.isEmpty(nextProps.auth) || nextProps.isAdmin) {
        nextProps.history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps, null)(withRouter(CustomerAuthentication));
}
