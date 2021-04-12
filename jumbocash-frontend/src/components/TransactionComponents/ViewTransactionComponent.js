import React, { Component } from "react";
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Spinner } from 'react-bootstrap';
import {
  DataGrid, GridToolbarContainer,
  GridToolbarExport, isOverflown
} from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import TransactionService from "../../services/TransactionService";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import Modal from '@material-ui/core/Modal';
import EditTransactionComponent from '../TransactionComponents/EditTransactionComponent'

import { makeStyles } from "@material-ui/core/styles";

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
    this.hideMessageAlert = this.hideMessageAlert.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
  }

  //close button functionality for message
  hideMessageAlert() {
    this.setState({
      message: false,
    });
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
        if ((error.response) && error.response.status === 404) {
          this.setState({
            message: "No Transactions found!",
            isLoading: false
          })
        }
        else {
          this.setState({
            message: "Error occurred while fetching transactions",
            isLoading: false
          })
        }
      }
    )

  }

  editTransaction() {
    if (this.state.transactionToEdit != null) {
      this.setState({ openModal: true });
    }
    else {
      this.setState({
        message: "Please select a transaction first"
      })
    }
  }

  deleteTransaction() {
    if (this.state.transactionToEdit != null) {
      TransactionService.deleteTransaction(this.state.transactionToEdit.id).then(
        response => {
          this.setState({
            message: "Transaction Deleted successfully!"
          })
        }
      ).catch(
        error => {
          this.setState({
            message: "Error occurred while deleting transaction",
            isLoading: false
          })

        }
      ).then(() => {
        this.getTransactions();
      })
    }
    else {
      this.setState({
        message: "Please select a transaction first"
      })
    }
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
              startIcon={<EditTwoToneIcon fontSize="small" />}
              onClick={this.editTransaction}>
              Edit
            </Button>
            <Button variant="outlined" size="medium" color="primary"
              startIcon={<DeleteTwoToneIcon fontSize="small" />}
              onClick={this.deleteTransaction}>
              Delete
            </Button>
            <Modal
              open={this.state.openModal}
              onClose={this.handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <EditTransactionComponent userId={this.props.userId}
                transactionToEdit={this.state.transactionToEdit}
                openModal={this.state.openModal}
                handleClose={this.handleClose}
                getTransactions={this.getTransactions}

              />
            </Modal>
          </div>
          <br />
          {this.state.message && <div className="alert alert-warning" role="alert">{this.state.message}
            <button type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => this.hideMessageAlert()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>}
          <div style={{ height: 450, width: '100%' }}>
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
        </div>
      );
    }
  }
}

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
    field: 'tranDate', headerName: 'Date', width: 120, type : 'date', 
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
    renderCell: renderCellExpand
  },
  {
    field: 'entityName', headerName: 'Entity Name', width: 200,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
    renderCell: renderCellExpand
  },
  {
    field: 'paymentMode', headerName: 'Payment Mode', width: 150,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
    renderCell: renderCellExpand
  },
  {
    field: 'tranType', headerName: 'Type', width: 150,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
    renderCell: renderCellExpand,
    cellClassName: (params) =>
      clsx('tranType', {
        credit: params.value === 'credit',
        debit: params.value === 'debit',
      }),
  },
  {
    field: 'amount', headerName: 'Amount', width: 150, type : 'number',
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
    renderCell: renderCellExpand,
    cellClassName: (params) =>
      clsx('amount', {
        positive: params.value > 0,
        negative: params.value < 0
      }),
  },
  {
    field: 'tranStatus', headerName: 'Status', width: 100,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center',
    renderCell: renderCellExpand,
    cellClassName: (params) =>
      clsx('tranStatus', {
        pending: params.value === 'Pending',
        done: params.value === 'Done'
      }),
  },
  {
    field: 'remarks', headerName: 'Remarks', width: 250,
    headerClassName: 'super-app-theme--header', align: 'center', headerAlign: 'center',
    renderCell: renderCellExpand
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

// Cell Expand Styling
const expandCellStyles = makeStyles(() => ({
  root: {
    alignItems: "center",
    lineHeight: "24px",
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    "& .cellValue": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }
}));


const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = expandCellStyles();
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <div
      ref={wrapper}
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cellDiv}
        style={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <div ref={cellValue} className="cellValue">
        {value}
      </div>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </div>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value ? params.value.toString() : ''}
      width={params.colDef.width}
    />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.any.isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
};


export default withStyles(useStyles)(ViewTransactionComponent);


