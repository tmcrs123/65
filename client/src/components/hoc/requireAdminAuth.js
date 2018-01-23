import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";

/**
 * Async flow of operations! This is trigered when someone goes directly to /admin/something.
 * The flow is 1st - Header (that goes to the DB) and then AdminAuthentication cdm.
 * When cdm is hit , header fetch user is not yet done so state is {}. However need to
 * make sure that if header fetch user is super fast need to check if user has permissions
 * to see the content
 */

export default function(ComposedComponent) {
  class AdminAuthentication extends Component {
    componentWillReceiveProps(nextProps) {
      if (_.isEmpty(nextProps.auth) || !nextProps.isAdmin) {
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

  return connect(mapStateToProps, null)(withRouter(AdminAuthentication));
}
