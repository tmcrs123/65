import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions_index.js";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import Chip from "material-ui/Chip";
import { styles } from "../../../styles/styles";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
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
import _ from "lodash";

import { ITEMS_PER_PAGE, PAGES_TO_SHOW } from "../../../helpers/constants";

class CustomerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  deleteCustomer(event, customerId) {
    console.log("click handler");
    this.props.deleteCustomer(customerId);
  }

  handlePageChange(value) {
    this.setState({
      currentPage: value
    });
  }

  renderBlacklistedChip(customer) {
    if (customer.blacklisted) {
      return (
        <IconButton
          iconClassName="material-icons"
          iconStyle={styles.iconButton.smallIconRed}
          style={styles.iconButton.small}
        >
          remove_circle
        </IconButton>
      );
    }

    return (
      <IconButton
        iconClassName="material-icons"
        iconStyle={styles.iconButton.smallIconGreen}
        style={styles.iconButton.small}
      >
        check_circle
      </IconButton>
    );
  }

  renderTableHeader() {
    return (
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Name </TableHeaderColumn>
          <TableHeaderColumn>Email </TableHeaderColumn>
          <TableHeaderColumn>Phone </TableHeaderColumn>
          <TableHeaderColumn>Blacklisted </TableHeaderColumn>
          <TableHeaderColumn>Notes </TableHeaderColumn>
          <TableHeaderColumn>More </TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }

  renderTableRows(customers) {
    if (customers.length === 0) {
      return (
        <TableRow hoverable={true}>
          <TableRowColumn> No customers found </TableRowColumn>
        </TableRow>
      );
    }

    const currentPage = this.state.currentPage;
    const firstIndex = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
    const lastIndex = (currentPage + 1) * ITEMS_PER_PAGE - ITEMS_PER_PAGE;

    const pagedCustomers = customers.slice(firstIndex, lastIndex);

    return pagedCustomers.map((customer, index) => {
      return (
        <TableRow hoverable={true} key={index}>
          <TableRowColumn> {customer.name} </TableRowColumn>
          <TableRowColumn> {customer.email} </TableRowColumn>
          <TableRowColumn> {customer.phone} </TableRowColumn>
          <TableRowColumn>
            {this.renderBlacklistedChip(customer)}
          </TableRowColumn>
          <TableRowColumn>{customer.notes}</TableRowColumn>
          <TableRowColumn>
            <IconMenu
              iconButtonElement={
                <IconButton
                  iconClassName="material-icons"
                  iconStyle={styles.iconButton.smallIcon}
                  style={styles.iconButton.small}
                >
                  expand_more
                </IconButton>
              }
              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}
            >
              <Link to={`/admin/dashboard/customer/edit/${customer._id}`}>
                <MenuItem primaryText="Edit" />
              </Link>
              <MenuItem
                onClick={event => this.deleteCustomer(event, customer._id)}
                primaryText="Delete"
              />
            </IconMenu>
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  // <IconButton
  //             iconClassName="material-icons"
  //             iconStyle={styles.iconButton.smallIcon}
  //             style={styles.iconButton.small}
  //             onClick={event => this.deleteCustomer(event, customer._id)}
  //           >
  //             delete
  //           </IconButton>

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
        <div
          style={{
            textAlign: "right"
          }}
        >
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
