import React, { Component } from "react";
import { Card, CardTitle } from "material-ui/Card";
import { styles } from "../../../styles/styles";

export default props => {
  return (
    <Card zDepth={0} style={props.styling}>
      <CardTitle>
        <h3>{props.title}</h3>
        <h6>{props.subtitle}</h6>
      </CardTitle>
    </Card>
  );
};
