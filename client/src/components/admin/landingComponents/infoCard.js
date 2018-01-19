import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import { Card, CardTitle } from "material-ui/Card";
import { styles } from "../../../styles/styles";

class InfoCard extends Component {
  render() {
    return (
      <Card zDepth={0} style={styles.AdminDashboard.infoCard}>
        <CardTitle>
          <h3>
            #{this.props.monthReservationCount
              ? this.props.monthReservationCount.count
              : ""}
          </h3>
          <p>is the number of reservations you have this month.</p>
        </CardTitle>
      </Card>
    );
  }
}

export default InfoCard;
