import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../../actions/actions_index";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from "material-ui/Table";
import { Card, CardActions, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import { styles } from "../../styles/styles";
import List from "material-ui/svg-icons/action/list";

class AdminDateIntervalsList extends Component {
  componentWillMount() {
    this.props.getDateIntervals();
  }

  deleteDateInterval(event, intervalId) {
    this.props.deleteDateInterval(intervalId);
  }

  renderDateIntervalsList(intervals) {
    return intervals.map((interval, index) => {
      return (
        <TableRow hoverable={false} key={index}>
          <TableRowColumn style={styles.pricesDashboard.dateIntervals.table}>
            {moment(interval.startDate).format("YYYY/MM/DD")}
          </TableRowColumn>
          <TableRowColumn style={styles.pricesDashboard.dateIntervals.table}>
            {moment(interval.endDate).format("YYYY/MM/DD")}
          </TableRowColumn>
          <TableRowColumn style={styles.pricesDashboard.dateIntervals.table}>
            {interval.price}
          </TableRowColumn>
          <TableRowColumn style={styles.pricesDashboard.dateIntervals.table}>
            <RaisedButton
              label="Delete"
              secondary={true}
              onClick={event => this.deleteDateInterval(event, interval._id)}
            />
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <Paper
        style={styles.pricesDashboard.dateIntervals.dateIntervalsList.paper}
      >
        <h5 style={styles.pricesDashboard.dateIntervals.noMargin}>
          <List style={styles.pricesDashboard.dateIntervals.icon} />
          <span style={styles.pricesDashboard.dateIntervals.textSpan}>
            Price interval list
          </span>
        </h5>
        <hr />
        <div style={{ height: 200 }}>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn
                  style={styles.pricesDashboard.dateIntervals.table}
                >
                  Start Date
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={styles.pricesDashboard.dateIntervals.table}
                >
                  End Date
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={styles.pricesDashboard.dateIntervals.table}
                >
                  Price
                </TableHeaderColumn>
                <TableHeaderColumn
                  style={styles.pricesDashboard.dateIntervals.table}
                >
                  Delete
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody displayRowCheckbox={false}>
              {this.renderDateIntervalsList(this.props.dateIntervals)}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return { dateIntervals: state.dateIntervals };
}

export default connect(mapStateToProps, actions)(AdminDateIntervalsList);
