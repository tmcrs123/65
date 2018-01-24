import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/actions_index.js";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import Chip from "material-ui/Chip";
import { styles } from "../../../styles/styles";
import { colors } from "../../../styles/styles";
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
        <Chip style={styles.chip} backgroundColor={colors.red}>
          Yes
        </Chip>
      );
    }

    return (
      <Chip style={styles.chip} backgroundColor={colors.green}>
        No
      </Chip>
    );
  }

  renderTableHeader() {
    return (
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Name
          </TableHeaderColumn>

          <TableHeaderColumn style={styles.table.tableFont.header}>
            Email
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Phone
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Blacklisted
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Notes
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            # Reservations
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            More
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }

  renderTableRows(customers) {
    if (customers.length === 0) {
      return (
        <TableRow hoverable={true}>
          <TableRowColumn style={styles.table.tableFont.row}>
            {" "}
            No customers found{" "}
          </TableRowColumn>
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
          <TableRowColumn style={styles.table.tableFont.row}>
            {customer.name}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {customer.email}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {customer.phone}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {this.renderBlacklistedChip(customer)}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {(() => {
              if (!customer.notes || customer.notes === "") return "No";
              return "Yes";
            })()}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {customer.reservations.length}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
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
