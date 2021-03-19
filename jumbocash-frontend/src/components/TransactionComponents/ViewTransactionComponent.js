import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TransactionService from "../../services/TransactionService";
import AddTransactionComponent from "./AddTransactionComponent";
import Button from 'react-bootstrap/Button';

class ViewTransactionComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            transactions: [],
            message: null,
            openAddFlag: false
        }
        this.getHeader = this.getHeader.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
        this.addButtonOnclick = this.addButtonOnclick.bind(this);
        this.addButtonClose = this.addButtonClose.bind(this);
        // this.loadLatestMemes = this.loadLatestMemes.bind(this);
        // this.editButtonClick = this.editButtonClick.bind(this);
        // this.editButtonClose = this.editButtonClose.bind(this);
        // this.loadLatestMemesByName = this.loadLatestMemesByName.bind(this);
    }

    componentDidMount() {
        this.getTransactions();
    }

    getTransactions(){
        TransactionService.getTransactionsByUserId(2).then(
            response => {
                this.setState({
                    transactions : response.data
                })

                console.log(response.data);
            }
            
        ).catch(
            error => {
                this.setState({message : "Error occurred"})
            }
        )
    }

    addButtonOnclick(){
      this.setState({
        openAddFlag : true
      })
    }

    addButtonClose(){
      this.setState({
        openAddFlag : false
      })
    }

    getHeader() {
        return [
            { id: 'Date', label: 'Date', minWidth: 170 },
            { id: 'Amount', label: 'Amount', minWidth: 100 },
            {
              id: 'Transaction Type',
              label: 'Transaction Type',
              minWidth: 170,
              align: 'right',
              format: (value) => value.toLocaleString('en-US'),
            },
            {
              id: 'Payment Mode',
              label: 'Payment Mode',
              minWidth: 170,
              align: 'right',
              format: (value) => value.toLocaleString('en-US'),
            },
            {
              id: 'Entity',
              label: 'Entity',
              minWidth: 170,
              align: 'center',
              format: (value) => value.toFixed(2),
            },
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
            
        <div>
        <Button variant="primary" onClick={this.addButtonOnclick}>Add Transaction</Button>
        {this.state.openAddFlag && <AddTransactionComponent addButtonClose={this.addButtonClose}/>}
        <TableContainer component={Paper}>
          
      <Table  size="small" aria-label="a dense table">
      
      <TableHead>
            <TableRow>
              {this.getHeader().map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                    <b>
                  {column.label}
                  </b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
              {
                  this.state.transactions.map(
                      transaction =>
                      <TableRow key={transaction.tranId}>
                          <TableCell align="left">{transaction.tranTimestamp}</TableCell> 
                          <TableCell align="center">{transaction.amount}</TableCell> 
                          <TableCell align="center">{transaction.tranType}</TableCell> 
                          <TableCell align="center">{transaction.paymentMode}</TableCell> 
                          <TableCell align="center">{transaction.entityName}</TableCell> 
                          <TableCell align="left">{transaction.remarks}</TableCell> 
                      </TableRow>

                  )
              }
          </TableBody>
        </Table>
        </TableContainer>
        </div> 
        )
    }
}

export default ViewTransactionComponent