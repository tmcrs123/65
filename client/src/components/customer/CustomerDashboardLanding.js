import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/actions_index";
import Chip from "material-ui/Chip";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import Snackbar from "material-ui/Snackbar";
import _ from "lodash";
import moment from "moment";
import { REJECTED, APPROVED } from "../../helpers/constants";
import { styles, colors } from "../../styles/styles";
import Paper from "material-ui/Paper";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import List from "material-ui/svg-icons/action/list";

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteReservationDialogOpen: false,
      showMessage: false
    };
  }

  componentDidMount() {
    this.props.getCustomerReservations();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== "") {
      this.setState({ showMessage: true });
    } else {
      this.setState({ showMessage: false });
    }
  }

  handleRequestClose() {
    this.props.clearMessage();
  }

  deleteReservation(reservationId) {
    this.props.deleteReservation(reservationId);
  }

  handleDeleteReservationDialogOpen = () => {
    this.setState({ deleteReservationDialogOpen: true });
  };

  handleDeleteReservationDialogClose = () => {
    this.setState({ deleteReservationDialogOpen: false });
  };

  renderChip(reservation) {
    let backgroundColor;

    switch (reservation.status) {
      case APPROVED:
        backgroundColor = colors.green;
        break;
      case REJECTED:
        backgroundColor = colors.red;
        break;
      default:
        backgroundColor = colors.yellow;
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
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Start Date
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            End Date
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Adults/Childrens
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Price
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Paid
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Observations
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Edit
          </TableHeaderColumn>
          <TableHeaderColumn style={styles.table.tableFont.header}>
            Delete
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }

  renderReservations(reservations) {
    if (reservations.length === 0) {
      return (
        <TableRow hoverable={true}>
          <TableRowColumn> No reservations found </TableRowColumn>
        </TableRow>
      );
    }

    return reservations.map((reservation, index) => {
      let dialogActions = [
        <RaisedButton
          label="Delete"
          secondary={true}
          style={styles.buttonMargin}
          onClick={() => {
            this.deleteReservation(reservation._id);
            this.handleDeleteReservationDialogClose();
          }}
        />,
        <RaisedButton
          label="Back"
          primary={true}
          onClick={this.handleDeleteReservationDialogClose}
        />
      ];

      return (
        <TableRow hoverable={true} key={index}>
          <TableRowColumn style={styles.table.tableFont.row}>
            {moment(reservation.startDate).format("YYYY/MM/D")}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {moment(reservation.endDate).format("YYYY/MM/D")}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {`${reservation.numberAdults}/${reservation.numberChildrens}`}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {this.renderChip(reservation)}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {reservation.price} €
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {reservation.price_paid} €
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {reservation.observations}
          </TableRowColumn>
          <TableRowColumn style={styles.table.tableFont.row}>
            {(() => {
              if (reservation.status === REJECTED) return null;
              return (
                <Link
                  to={`/customer/dashboard/editReservation/${reservation._id}`}
                >
                  <RaisedButton label="Edit" primary={true} />
                </Link>
              );
            })()}
          </TableRowColumn>
          <TableRowColumn>
            {(() => {
              if (reservation.status === REJECTED) return null;
              return (
                <RaisedButton
                  label="Delete"
                  onClick={this.handleDeleteReservationDialogOpen}
                  secondary={true}
                >
                  <Dialog
                    title="Delete reservation"
                    actions={dialogActions}
                    modal={false}
                    open={this.state.deleteReservationDialogOpen}
                    onRequestClose={() =>
                      this.handleDeleteReservationDialogClose()
                    }
                  >
                    Are you sure you want to delete this reservation?
                  </Dialog>
                </RaisedButton>
              );
            })()}
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <Paper style={styles.table.paper}>
        <h4>
          <List style={styles.adminAvailability.icon} />
          <span style={styles.adminAvailability.dateCheckPhrase.checkHeader}>
            My Reservations
          </span>
          <hr />
        </h4>
        <Table>
          {this.renderTableHeader()}
          <TableBody displayRowCheckbox={false}>
            {this.props.reservations
              ? this.renderReservations(this.props.reservations)
              : ""}
          </TableBody>
        </Table>
        <Snackbar
          open={this.state.showMessage}
          message={this.props.message}
          autoHideDuration={4000}
          onRequestClose={() => this.handleRequestClose()}
        />
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    reservations: state.customerReservations,
    message: state.messages.message
  };
}

export default connect(mapStateToProps, actions)(CustomerDashboard);
