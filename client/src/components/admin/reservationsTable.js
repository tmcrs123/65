import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions_index";
import _ from "lodash";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Chip from "material-ui/Chip";
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
import { styles } from "../../styles/styles";
import { ITEMS_PER_PAGE, PAGES_TO_SHOW } from "../../helpers/constants";
import { red800, green800, yellow800 } from "material-ui/styles/colors";
import { REJECTED, APPROVED, PENDING } from "../../helpers/constants";

class CustomerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  deleteReservation(event, reservationId) {
    this.props.deleteReservation(reservationId);
  }

  handlePageChange(value) {
    this.setState({
      currentPage: value
    });
  }

  renderChip(reservation) {
    let backgroundColor;

    switch (reservation.status) {
      case APPROVED:
        backgroundColor = green800;
        break;
      case REJECTED:
        backgroundColor = red800;
        break;
      default:
        backgroundColor = yellow800;
    }

    return (
      <Chip style={styles.chip} backgroundColor={backgroundColor}>
        {_.capitalize(reservation.status)}
      </Chip>
    );
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
          <TableHeaderColumn> More </TableHeaderColumn>
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
          <TableRowColumn>{this.renderChip(reservation)}</TableRowColumn>
          <TableRowColumn> {reservation.price} </TableRowColumn>
          <TableRowColumn> {reservation.price_paid} </TableRowColumn>

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
              <Link to={`/admin/dashboard/reservation/edit/${reservation._id}`}>
                <MenuItem primaryText="Edit" />
              </Link>
              <MenuItem
                onClick={event =>
                  this.deleteReservation(event, reservation._id)
                }
                primaryText="Delete"
              />
            </IconMenu>
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
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
