import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

function renderTableHeader() {
  return (
    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Email</TableHeaderColumn>
        <TableHeaderColumn>Phone</TableHeaderColumn>
        <TableHeaderColumn>Blacklisted</TableHeaderColumn>
        <TableHeaderColumn>Observations</TableHeaderColumn>
        <TableHeaderColumn>Edit</TableHeaderColumn>
        <TableHeaderColumn>Delete</TableHeaderColumn>
      </TableRow>
    </TableHeader>
  );
}

function renderTableRows(customers) {
  return customers.map(customer => {
    return (
      <TableRow hoverable={true} key={customer.id}>
        <TableRowColumn>{customer.name}</TableRowColumn>
        <TableRowColumn>{customer.email}</TableRowColumn>
        <TableRowColumn>{customer.phone}</TableRowColumn>
        <TableRowColumn>{`${customer.blacklisted}`}</TableRowColumn>
        <TableRowColumn>
          <i className="material-icons">textsms</i>
        </TableRowColumn>
        <TableRowColumn>
          <i className="material-icons">edit</i>
        </TableRowColumn>
        <TableRowColumn>
          <i className="material-icons">delete</i>
        </TableRowColumn>
      </TableRow>
    );
  });
}

export default props => {
  return (
    <Table>
      {renderTableHeader()}
      <TableBody displayRowCheckbox={false}>
        {renderTableRows(props.customers)}
      </TableBody>
    </Table>
  );
};
