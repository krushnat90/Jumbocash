import React, { Component } from "react";
import { Spinner } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import TransactionService from "../../services/TransactionService";


const columns = [
  //{ field: 'tranId', headerName: 'Id', width: 150 },
  { field: 'tranDate', headerName: 'Date', width: 200 },
  { field: 'entityName', headerName: 'Entity Name', width: 150 },
  { field: 'paymentMode', headerName: 'Payment Mode', width: 150 },
  { field: 'tranType', headerName: 'Transaction Type', width: 200 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'remarks', headerName: 'Remarks', width: 250 }
];

class ViewTransactionComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      transactions: [],
      message: null,
      openAddFlag: false,
      userId: props.userId
    }
    this.getTransactions = this.getTransactions.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions() {
    TransactionService.getTransactionsByUserId(this.state.userId).then(
      response => {
        this.setState({
          transactions: response.data,
          isLoading: false
        })
      }
    ).catch(
      error => {
        this.setState({ message: "Error occurred" })
      }
    )
  }

  render() {
    console.log("isLoading" + this.state.isLoading);
    if (this.state.isLoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      return (
        <div style={{ height: 500, width: '100%' }} class ="container">
          <DataGrid rows={this.state.transactions} columns={columns} sortModel={[
            {
              field: 'tranDate',
              sort: 'desc',
            },
          ]} />
        </div>
      );
    }
  }
}

export default ViewTransactionComponent;


