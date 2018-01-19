import React, { Component } from "react";
import { connect } from "react-redux";
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
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import { styles } from "../../styles/styles";

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
          <TableRowColumn>{interval.startDate}</TableRowColumn>
          <TableRowColumn>{interval.endDate}</TableRowColumn>
          <TableRowColumn>{interval.price}</TableRowColumn>
          <TableRowColumn>
            <FlatButton
              label="Delete"
              primary={true}
              onClick={event => this.deleteDateInterval(event, interval._id)}
            />
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <Paper style={styles.pricesDashboard.defaultPriceList.paper}>
        <h5>
          <strong>Edit</strong> default price
        </h5>
        <hr />
        <div style={{ height: 200 }}>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn> Start Date </TableHeaderColumn>
                <TableHeaderColumn> End Date </TableHeaderColumn>
                <TableHeaderColumn> Price </TableHeaderColumn>
                <TableHeaderColumn> Delete </TableHeaderColumn>
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
