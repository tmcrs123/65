import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/admin_actions";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from "material-ui/Table";
import Pagination from "material-ui-pagination";

import { ITEMS_PER_PAGE, PAGES_TO_SHOW } from "../../../helpers/constants";

class CustomerTable extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1, observationsDialogOpen: false };
  }

  deleteCustomer(event, customerId) {
    console.log("in delete customer handler");
    this.props.deleteCustomer(customerId);
  }

  renderTableHeader() {
    return (
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Email</TableHeaderColumn>
          <TableHeaderColumn>Phone</TableHeaderColumn>
          <TableHeaderColumn>Blacklisted</TableHeaderColumn>
          <TableHeaderColumn>Notes</TableHeaderColumn>
          <TableHeaderColumn>Edit</TableHeaderColumn>
          <TableHeaderColumn>Delete</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }

  renderTableRows(customers) {
    if (customers.length === 0) {
      return (
        <TableRow hoverable={true}>
          <TableRowColumn>No customers found</TableRowColumn>
        </TableRow>
      );
    }

    const currentPage = this.state.currentPage;
    const firstIndex = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
    const lastIndex = (currentPage + 1) * ITEMS_PER_PAGE - ITEMS_PER_PAGE;

    const pagedCustomers = customers.slice(firstIndex, lastIndex);

    const rowStyle = {
      maxWidth: "100%",
      whiteSpace: "nowrap"
    };

    return pagedCustomers.map(customer => {
      return (
        <TableRow hoverable={true} key={customer.id}>
          <TableRowColumn style={rowStyle}>{customer.name}</TableRowColumn>
          <TableRowColumn style={rowStyle}>{customer.email}</TableRowColumn>
          <TableRowColumn style={rowStyle}>{customer.phone}</TableRowColumn>
          <TableRowColumn style={rowStyle}>{`${
            customer.blacklisted
          }`}</TableRowColumn>
          <TableRowColumn style={rowStyle}>{customer.notes}</TableRowColumn>
          <TableRowColumn style={rowStyle}>
            <IconButton iconClassName="material-icons">edit</IconButton>
          </TableRowColumn>
          <TableRowColumn>
            <IconButton
              iconClassName="material-icons"
              onClick={event => this.deleteCustomer(event, customer.id)}
            >
              delete
            </IconButton>
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  handlePageChange(value) {
    this.setState({ currentPage: value });
  }

  render() {
    const totalPages = Math.ceil(this.props.customers.length / ITEMS_PER_PAGE);

    return (
      <div>
        <Table>
          {this.renderTableHeader()}
          <TableBody displayRowCheckbox={false}>
            {this.renderTableRows(this.props.customers)}
          </TableBody>
        </Table>
        <div style={{ textAlign: "right" }}>
          <Pagination
            total={totalPages}
            display={PAGES_TO_SHOW}
            current={this.state.currentPage}
            onChange={value => this.handlePageChange(value)}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(CustomerTable);
