import React, { Component } from "react";
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Spinner } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import TransactionService from "../../services/TransactionService";
import { fontWeight, textAlign } from "@material-ui/system";


const columns = [
  //{ field: 'tranId', headerName: 'Id', width: 150 },
  { field: 'tranDate', headerName: 'Date', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center', align : 'center'},
  { field: 'entityName', headerName: 'Entity Name', width: 150, headerClassName: 'super-app-theme--header' , headerAlign: 'center', align : 'center'},
  { field: 'paymentMode', headerName: 'Payment Mode', width: 150, headerClassName: 'super-app-theme--header' , headerAlign: 'center' , align : 'center'},
  {
    field: 'tranType', headerName: 'Transaction Type', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center' , align : 'center'
    , cellClassName: (params) =>
      clsx('tranType', {
        credit: params.value === 'credit',
        debit: params.value === 'debit',
      }),
  },
  {
    field: 'amount', headerName: 'Amount', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align : 'center',cellClassName: (params) =>
      clsx('amount', {
        positive: params.value > 0,
        negative: params.value < 0
      }),
  },
  // {
  //   field: 'tranStatus', headerName: 'Transaction Status', width: 150, cellClassName: (params) =>
  //     clsx('tranStatus', {
  //       pending: params.value === 'pending',
  //       done: params.value === 'done'
  //     }),
  // },
  { field: 'remarks', headerName: 'Remarks', width: 250, headerClassName: 'super-app-theme--header' , align : 'center', headerAlign : 'center' }
];

const useStyles = theme => ({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(73,79,175, 0.7)',
      color: 'white',
      fontWeight : '600'
    },
    '& .amount.negative': {
      color: 'red',
    },
    '& .amount.positive': {
      color: 'green'
    },
  },
});


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
        this.setState({
          message: "Error occurred",
          isLoading: false
        })

      }
    )

  }

  render() {
    const { classes } = this.props;
    
    if (this.state.isLoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      return (

        <div style={{ height: 500, width: '100%' }} className="container">
          <DataGrid className={classes.root}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            rows={this.state.transactions} columns={columns} sortModel={[
              {
                field: 'tranDate',
                sort: 'desc',
              },
            ]}
          />
        </div>
      );
    }
  }
}

export default withStyles(useStyles)(ViewTransactionComponent);
//export default ViewTransactionComponent;


