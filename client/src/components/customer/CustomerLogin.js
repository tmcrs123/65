import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";

export default () => {
  return (
    <div className="container center-align">
      <h1>Welcome!</h1>
      <p>Login with your favorite service</p>

      <RaisedButton href="/auth/google" primary={true} labelColor={"#FFFFFF"}>
        Google
      </RaisedButton>
      <RaisedButton href="/auth/facebook" secondary={true}>
        Facebook
      </RaisedButton>
    </div>
  );
};
