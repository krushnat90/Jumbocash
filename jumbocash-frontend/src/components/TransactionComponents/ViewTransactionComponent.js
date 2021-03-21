import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
import TransactionService from "../../services/TransactionService";
import AddTransactionComponent from "./AddTransactionComponent";
import Button from 'react-bootstrap/Button';
import QueueTwoToneIcon from '@material-ui/icons/QueueTwoTone';
import IconButton from '@material-ui/core/IconButton';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Card, CardContent } from "@material-ui/core";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// import Table from 'react-bootstrap/Table';

class ViewTransactionComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      message: null,
      openAddFlag: false,
      userId: 2
    }
    this.getHeader = this.getHeader.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.addButtonOnclick = this.addButtonOnclick.bind(this);
    this.addButtonClose = this.addButtonClose.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions() {
    TransactionService.getTransactionsByUserId(this.state.userId).then(
      response => {
        this.setState({
          transactions: response.data
        })

        console.log(response.data);
      }

    ).catch(
      error => {
        this.setState({ message: "Error occurred" })
      }
    )
  }

  addButtonOnclick() {
    this.setState({
      openAddFlag: true
    })
  }

  addButtonClose() {
    this.setState({
      openAddFlag: false
    })
  }

  getHeader() {
    return [
      { id: 'Date', label: 'Date', minWidth: 170 },
      {
        id: 'Entity',
        label: 'Entity',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'Payment Mode',
        label: 'Payment Mode',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'Transaction Type',
        label: 'Transaction Type',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
      },
      { id: 'Amount', label: 'Amount', minWidth: 100 },

      {
        id: 'Remarks',
        label: 'Remarks',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
      },
    ]
  }

  render() {
    return (

      <div className="container">
        <div>
        <IconButton className="queueTwoToneIcon" aria-label="edit" color="primary"
          onClick={() =>
            this.addButtonOnclick()}>
          <QueueTwoToneIcon />
        </IconButton>
        {this.state.openAddFlag && <AddTransactionComponent addButtonCloseFunc={this.addButtonClose} getTransactionsFunc={this.getTransactions} userId={this.state.userId} />}
      </div>  

      <div>
        <Card >
        <CardContent>
        <Table>
          <Thead>
            <Tr>
              {this.getHeader().map((column) => (
                <Th
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b>
                    {column.label}
                  </b>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {
              this.state.transactions.map(
                transaction =>
                  <Tr key={transaction.tranId}>
                    <Td align="center">{transaction.tranTimestamp}</Td>
                    <Td align="center">{transaction.entityName}</Td>
                    <Td align="center">{transaction.paymentMode}</Td>
                    <Td align="center">{transaction.tranType}</Td>
                    <Td align="center">
                      {transaction.amount}
                      {transaction.tranType.toLowerCase() == 'credit' && <ArrowDropUpIcon className = "green-color"/>}
                    {transaction.tranType.toLowerCase() == 'debit' && <ArrowDropDownIcon className = "red-color"/>}</Td>
                    <Td align="center">{transaction.remarks}</Td>
                  </Tr>
              )
            }
          </Tbody>
        </Table>
        </CardContent>
        </Card>
        </div>
      </div>
    )
  }
}

export default ViewTransactionComponent