import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions_index";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from "material-ui/Table";
import Pagination from "material-ui-pagination";
import axios from "axios";

import { ITEMS_PER_PAGE, PAGES_TO_SHOW } from "../../helpers/constants";

class CustomerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      observationsDialogOpen: false,
      reservations: []
    };
  }

  componentWillMount() {
    console.log("cdm");
    axios
      .get("/api/reservations")
      .then(reservations => this.setState({ reservations: reservations.data }));
  }

  //   deleteCustomer(event, customerId) {
  //     this.props.deleteCustomer(customerId);
  //   }

  handlePageChange(value) {
    this.setState({ currentPage: value });
  }

  //HeaderFields === [string]
  renderTableHeader(headers) {
    return headers.map(header => {
      return <TableHeaderColumn key={header}>{header}</TableHeaderColumn>;
    });
  }

  renderTableRowColumn(item) {
    return Object.values(item).map((value, index) => {
      return <TableRowColumn key={index}>{value}</TableRowColumn>;
    });
  }

  //rowItems === [items to render] db must return the correct shape of array
  renderTableRows(rowItems) {
    return rowItems.map(item => {
      return (
        <TableRow hoverable={true} key={item.id}>
          {this.renderTableRowColumn(item)}
        </TableRow>
      );
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("scu");
    console.log("next props", nextProps);
    console.log("next state", nextState);
    if (nextState.reservations.length) {
      return true;
    }
    return false;
  }

  // const currentPage = this.state.currentPage;
  // const firstIndex = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
  // const lastIndex = (currentPage + 1) * ITEMS_PER_PAGE - ITEMS_PER_PAGE;

  // const pagedRowItems = rowItems.slice(firstIndex, lastIndex);

  render() {
    const totalPages = Math.ceil(this.props.customers.length / ITEMS_PER_PAGE);

    return (
      <div>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              {this.renderTableHeader(this.props.tableHeaders)}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.reservations.length
              ? this.renderTableRows(this.state.reservations)
              : ""}
          </TableBody>
        </Table>
        <div style={{ textAlign: "right" }}>
          <Pagination
            total={totalPages}
            display={PAGES_TO_SHOW}
            current={this.state.currentPage}
            onChange={value => this.handlePageChange(value)}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(CustomerTable);
