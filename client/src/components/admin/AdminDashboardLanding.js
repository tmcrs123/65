import React from "react";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import ActionGrade from "material-ui/svg-icons/action/grade";
import Avatar from "material-ui/Avatar";
import { pinkA200, transparent } from "material-ui/styles/colors";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

const styles = {
  icon: {
    color: "blue",
    fontSize: "48px"
  },
  float: {
    float: "left",
    padding: "0px"
  },
  text: {
    fontSize: "16px",
    padding: "0px"
  },
  padding: {
    padding: "0px"
  }
};

export default () => {
  return (
    <div>
      <h2>Landing</h2>
      <div className="col s3">
        <Paper zDepth={5}>
          <List>
            <Card>
              <CardTitle
                title="Approve"
                subtitle="Approve is pending for these reservations"
              />
            </Card>

            <Divider inset={false} />
            <ListItem
              primaryText={"Chelsea Otakan"}
              leftIcon={<i className="material-icons">face</i>}
            />
            <ListItem
              primaryText={"Chelsea Otakan"}
              leftIcon={<i className="material-icons">face</i>}
            />
            <ListItem
              primaryText={"Chelsea Otakan"}
              leftIcon={<i className="material-icons">face</i>}
            />
            <ListItem
              primaryText={"Chelsea Otakan"}
              leftIcon={<i className="material-icons">face</i>}
            />
          </List>
        </Paper>
      </div>
    </div>
  );
};
