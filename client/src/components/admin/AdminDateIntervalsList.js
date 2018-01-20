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
          <TableRowColumn>
            {moment(interval.startDate).format("YYYY/MM/DD")}
          </TableRowColumn>
          <TableRowColumn>
            {moment(interval.endDate).format("YYYY/MM/DD")}
          </TableRowColumn>
          <TableRowColumn>{interval.price}</TableRowColumn>
          <TableRowColumn>
            <RaisedButton
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
          <i className="material-icons">list</i>
          Default price list
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
