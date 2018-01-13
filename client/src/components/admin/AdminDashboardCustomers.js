import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import * as actions from "../../actions/admin_actions";
import axios from "axios";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import CustomerTable from "./customerListComponents/customerTable";
import _ from "lodash";

class AdminDashboardCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = { filteredCustomers: [] };
  }

  componentDidMount() {
    console.log("cdm");
    this.props.getCustomerList();
  }

  componentWillReceiveProps(nextProps) {
    console.log("cwrp", nextProps);
    this.setState({ filteredCustomers: nextProps.customers });
  }

  componentWillUnmount() {
    console.log("unmount");
  }

  handleSearchChange(event, value) {
    axios.get(`/api/search?name=${value}`).then(res => {
      this.setState({ filteredCustomers: res.data });
    });
  }

  render() {
    const styles = {
      padding: "20px",
      margin: "10px"
    };

    const searchNames = _.debounce(
      (event, value) => this.handleSearchChange(event, value),
      500
    );

    return (
      <div className="row">
        <div className="container-fluid">
          <div className="col s12">
            <Paper style={styles}>
              <p>Customers List</p>
              <TextField floatingLabelText="Search" onChange={searchNames} />
              <CustomerTable customers={this.state.filteredCustomers} />
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
