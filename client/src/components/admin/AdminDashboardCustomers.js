import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import * as actions from "../../actions/admin_actions";
import axios from "axios";
import CustomerTable from "./customerListComponents/customerTable";
import _ from "lodash";

class AdminDashboardCustomer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCustomerList();
  }

  componentWillUnmount() {
    console.log("unmounting admin dashboard");
  }

  handleSearchChange(event, query) {
    this.props.searchCustomerByName(query);
  }

  render() {
    const styles = {
      padding: "20px",
      margin: "10px"
    };

    const searchNames = _.debounce(
      (event, query) => this.handleSearchChange(event, query),
      500
    );

    return (
      <div className="row">
        <div className="container-fluid">
          <div className="col s12">
            <Paper style={styles}>
              <p>Customers List</p>
              <TextField floatingLabelText="Search" onChange={searchNames} />
              <CustomerTable customers={this.props.customers} />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { customers: state.adminCustomerList };
}

export default connect(mapStateToProps, actions)(AdminDashboardCustomer);
