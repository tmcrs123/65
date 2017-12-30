import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <AppBar title="65" onLeftIconButtonClick={this.handleToggle} />
        <Drawer
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
          docked={false}
        >
          <MenuItem onClick={this.handleClose}>My Reservations</MenuItem>
          <MenuItem onClick={this.handleClose}>Create Reservations</MenuItem>
          <MenuItem onClick={this.handleClose}>Contact Us</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Navigation;
