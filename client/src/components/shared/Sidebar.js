import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { grey900, darkBlack } from "material-ui/styles/colors";
import PersonsGroup from "material-ui/svg-icons/social/group";
import Reservations from "material-ui/svg-icons/device/storage";
import Euro from "material-ui/svg-icons/action/euro-symbol";
import { styles } from "../../styles/styles";

class Sidebar extends Component {
  renderDrawerMenuItems() {
    if (this.props.isAdmin === undefined) {
      return <div />;
    } else {
      if (this.props.isAdmin) {
        return (
          <div>
            <Link to="/admin/dashboard/customers">
              <MenuItem
                style={styles.sidebar.menuItem}
                leftIcon={<PersonsGroup />}
              >
                Customers
              </MenuItem>
            </Link>
            <Link to="/admin/dashboard/reservations">
              <MenuItem
                style={styles.sidebar.menuItem}
                leftIcon={<Reservations />}
              >
                Reservations
              </MenuItem>
            </Link>
            <Link to="/admin/dashboard/prices">
              <MenuItem style={styles.sidebar.menuItem} leftIcon={<Euro />}>
                Prices
              </MenuItem>
            </Link>
          </div>
        );
      } else {
        return (
          <div>
            <Link to="/customer/dashboard/landing">
              <MenuItem onClick={this.handleClose}>My Reservations</MenuItem>
            </Link>
            <Link to="/customer/dashboard/createReservation">
              <MenuItem onClick={this.handleClose}>
                Create Reservations
              </MenuItem>
            </Link>
            <Link to="/customer/dashboard/createReservation">
              <MenuItem onClick={this.handleClose}>Contact Us</MenuItem>
            </Link>
          </div>
        );
      }
    }
  }

  render() {
    return this.renderDrawerMenuItems();
  }
}

function mapStateToProps({ auth }) {
  return { isAdmin: auth.isAdmin };
}

export default connect(mapStateToProps, null)(Sidebar);
