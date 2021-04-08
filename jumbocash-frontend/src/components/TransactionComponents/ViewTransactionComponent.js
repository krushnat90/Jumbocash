import React, { Component } from "react";
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Spinner } from 'react-bootstrap';
import {
  DataGrid, GridToolbarContainer,
  GridToolbarExport
} from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import TransactionService from "../../services/TransactionService";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import Modal from '@material-ui/core/Modal';
import EditTransactionComponent from '../TransactionComponents/EditTransactionComponent'
import { DeleteTwoTone } from "@material-ui/icons";


// Data grid styling
const useStyles = theme => ({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(25,31,77, 0.7)',
      color: 'white',
      fontWeight: '600'
    },
    '& .amount.negative': {
      color: 'rgb(245,54,92)',
    },
    '& .amount.positive': {
      color: 'rgb(50,207,140)'
    },
    '& .tranStatus.done': {
      color: 'rgb(17,205,239)',
    },
    '& .tranStatus.pending': {
      color: 'rgb(252,146,10)'
    },
  },
});

// Data grid columns
const columns = [
  {
    field: 'tranDate', headerName: 'Date', width: 150,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
  {
    field: 'entityName', headerName: 'Entity Name', width: 150,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
  {
    field: 'paymentMode', headerName: 'Payment Mode', width: 150,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
  {
    field: 'tranType', headerName: 'Type', width: 100,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
    cellClassName: (params) =>
      clsx('tranType', {
        credit: params.value === 'credit',
        debit: params.value === 'debit',
      }),
  },
  {
    field: 'amount', headerName: 'Amount', width: 150,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
    cellClassName: (params) =>
      clsx('amount', {
        positive: params.value > 0,
        negative: params.value < 0
      }),
  },
  {
    field: 'tranStatus', headerName: 'Status', width: 100,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
    cellClassName: (params) =>
      clsx('tranStatus', {
        pending: params.value === 'Pending',
        done: params.value === 'Done'
      }),
  },
  {
    field: 'remarks', headerName: 'Remarks', width: 250,
    headerClassName: 'super-app-theme--header', align: 'center', headerAlign: 'center'
  }
];

// Export to CSV
function CustomToolbar(transactions) {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

class ViewTransactionComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      transactions: [],
      message: null,
      openAddFlag: false,
      openModal: false,
      userId: props.userId,
      transactionToEdit: null
    }

    this.getTransactions = this.getTransactions.bind(this);
    this.editTransaction = this.editTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.rowSelected = this.rowSelected.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
          message: "Error occurred while fetching transactions",
          isLoading: false
        })

      }
    )

  }

  editTransaction() {
    console.log(this.state.transactionToEdit);
    if (this.state.transactionToEdit != null) {
      this.setState({ openModal: true });
    }
  }

  deleteTransaction() {

  }

  handleClose() {
    this.setState({ openModal: false });
  }

  async rowSelected(row) {
    await this.setState({ transactionToEdit: row.data });
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
          <div>
            <Button variant="outlined" size="medium" color="primary" 
              startIcon={<EditTwoToneIcon fontSize = "small" />}
              onClick={this.editTransaction}>
              Edit
            </Button>
            <Button variant="outlined" size="medium" color="primary" 
              startIcon={<DeleteTwoToneIcon fontSize = "small" />}
              onClick={this.deleteTransaction}>
              Delete
            </Button>
            <Modal
              open={this.state.openModal}
              onClose={this.handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <EditTransactionComponent userId = {this.props.userId} 
              transactionToEdit = {this.state.transactionToEdit}
              openModal = {this.state.openModal}
              handleClose = {this.handleClose}
              />
            </Modal>
          </div>
          <br/>
          <DataGrid className={classes.root}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              Toolbar: CustomToolbar,
            }}
            onRowSelected={(row) => this.rowSelected(row)}
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


