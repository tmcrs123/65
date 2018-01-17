import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions_index";

import { Card, CardActions, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

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
        <Card key={index}>
          <CardText>
            <p>Start-Date: {interval.startDate}</p>
            <p>End-Date: {interval.endDate}</p>
            <p>Price: {interval.price}</p>
          </CardText>
          <CardActions>
            <FlatButton
              label="Delete"
              onClick={event => this.deleteDateInterval(event, interval._id)}
            />
          </CardActions>
        </Card>
      );
    });
  }

  render() {
    return <div>{this.renderDateIntervalsList(this.props.dateIntervals)}</div>;
  }
}

function mapStateToProps(state) {
  return { dateIntervals: state.dateIntervals };
}

export default connect(mapStateToProps, actions)(AdminDateIntervalsList);
