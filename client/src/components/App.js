import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CustomerLogin from "./CustomerLogin.js";
import Sidebar from "./Sidebar.js";

export default () => {
  return (
    <MuiThemeProvider>
      <Sidebar />
    </MuiThemeProvider>
  );
};
