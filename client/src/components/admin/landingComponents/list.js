import React from "react";

import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import { Card, CardTitle } from "material-ui/Card";

export default () => {
  return (
    <Paper zDepth={5}>
      <List>
        <Card zDepth={0}>
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
  );
};
