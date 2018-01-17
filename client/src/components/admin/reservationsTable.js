import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions_index";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
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

import { ITEMS_PER_PAGE, PAGES_TO_SHOW } from "../../helpers/constants";

class CustomerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  deleteCustomer(event, customerId) {
    this.props.deleteReservation(customerId);
  }

  handlePageChange(value) {
    this.setState({
      currentPage: value
    });
  }

  renderTableHeader() {
    return (
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn> Customer </TableHeaderColumn>
          <TableHeaderColumn> Start Date </TableHeaderColumn>
          <TableHeaderColumn> End Date </TableHeaderColumn>
          <TableHeaderColumn> Status </TableHeaderColumn>
          <TableHeaderColumn> Price </TableHeaderColumn>
          <TableHeaderColumn> Paid </TableHeaderColumn>
          <TableHeaderColumn> Edit </TableHeaderColumn>
          <TableHeaderColumn> Delete </TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }

  renderTableRows(reservations) {
    if (reservations.length === 0) {
      return (
        <TableRow hoverable={true}>
          <TableRowColumn> No reservations found </TableRowColumn>
        </TableRow>
      );
    }

    const currentPage = this.state.currentPage;
    const firstIndex = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
    const lastIndex = (currentPage + 1) * ITEMS_PER_PAGE - ITEMS_PER_PAGE;

    const pagedReservations = reservations.slice(firstIndex, lastIndex);

    return pagedReservations.map((reservation, index) => {
      return (
        <TableRow hoverable={true} key={index}>
          <TableRowColumn> {reservation.customerName} </TableRowColumn>
          <TableRowColumn> {reservation.startDate} </TableRowColumn>
          <TableRowColumn> {reservation.endDate} </TableRowColumn>
          <TableRowColumn> {reservation.status} </TableRowColumn>
          <TableRowColumn> {reservation.price} </TableRowColumn>
          <TableRowColumn> {reservation.price_paid} </TableRowColumn>
          <TableRowColumn>
            <Link to={`/admin/dashboard/customer/edit/${reservation._id}`}>
              <IconButton iconClassName="material-icons"> edit </IconButton>
            </Link>
          </TableRowColumn>
          <TableRowColumn>
            <IconButton
              iconClassName="material-icons"
              onClick={event => this.deleteReservation(event, reservation._id)}
            >
              delete
            </IconButton>
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    console.log("in reder", this);
    const totalPages = Math.ceil(
      this.props.reservations.length / ITEMS_PER_PAGE
    );

    return (
      <div>
        <Table>
          {this.renderTableHeader()}
          <TableBody displayRowCheckbox={false}>
            {this.renderTableRows(this.props.reservations)}
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
