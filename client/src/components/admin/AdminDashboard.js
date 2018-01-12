import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/admin_actions";
import Sidebar from "../shared/Sidebar";
import { grey300 } from "material-ui/styles/colors";

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.getReservations();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    const styles = {
      backgroundColor: "#BDBDBD"
    };

    return (
      <div className="row">
        <Sidebar />
        <div className="row">
          <div className="col s10" style={styles}>
            <h2>Admin Dashboard</h2>
            <div className="container">
              <h4>More stuff here</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { reservations: state.adminReservations };
}

export default connect(mapStateToProps, actions)(AdminDashboard);
