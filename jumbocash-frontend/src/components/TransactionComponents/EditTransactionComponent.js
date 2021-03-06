import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Card, CardContent, IconButton } from "@material-ui/core";
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiSelect from "@material-ui/core/Select";
import MuiMenuItem from "@material-ui/core/MenuItem";
import TransactionService from "../../services/TransactionService";
import moment from "moment";
import Modal from '@material-ui/core/Modal';
import Close from '@material-ui/icons/Close';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  modalStyle:{
    position:'absolute',
    top:'10%',
    left:'10%',
    overflow:'scroll',
    height:'100%',
    display:'block'
  }
});

class EditTransactionComponent extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      entities: [],
      show: true,
      message: '',
      errorMessage: '',
      amount: '',
      tranType: '',
      paymentMode: '',
      entityId: '',
      userId: '',
      remarks: '',
      tranStatus: '',
      tranDate: '',
      today: moment().format("YYYY-MM-DD")
    };
    this.state = this.initialState;

    this.hideErrorAlert = this.hideErrorAlert.bind(this);
    this.hideMessageAlert = this.hideMessageAlert.bind(this);
    this.validate = this.validate.bind(this);
    this.setData = this.setData.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.editTransaction = this.editTransaction.bind(this);
  }


  componentDidMount() {
    this.setData();
  }


  setData() {
    let tranToEdit = this.props.transactionToEdit;
    console.log("update tran to edit");
    console.log(this.props.transactionToEdit);
    this.setState(
      {
        entityName: tranToEdit.entityName,
        tranDate: tranToEdit.tranDate,
        tranType: tranToEdit.tranType,
        paymentMode: tranToEdit.paymentMode,
        amount: tranToEdit.amount < 0 ? (0-tranToEdit.amount) : tranToEdit.amount,
        remarks: tranToEdit.remarks,
        userId: tranToEdit.userId,
        id: tranToEdit.id,
        entityId: tranToEdit.entityId,
        tranStatus: tranToEdit.tranStatus === "Done" ? "DN" : "PN",
      }
    )
  }

  //close button functionality for error
  hideErrorAlert() {
    this.setState({
      errorMessage: false,
    });
  }

  //close button functionality for message
  hideMessageAlert() {
    this.setState({
      message: false,
    });
  }

  //Basic validation
  validate(transaction) {

    if (!transaction.amount) {
      this.setState({ errorMessage: 'Amount is mandatory', message: '' })
      return false;
    } else if (transaction.amount < 0) {
      this.setState({ errorMessage: 'Amount must be positive', message: '' })
      return false;
    }
    else if (!transaction.tranDate) {
      this.setState({ errorMessage: 'Transaction date is mandatory', message: '' })
      return false;
    }
    else if (!transaction.tranType) {
      this.setState({ errorMessage: 'Transaction type is mandatory', message: '' })
      return false;
    }

    else if (!transaction.paymentMode) {
      this.setState({ errorMessage: 'Payment mode is mandatory', message: '' })
      return false;
    }

    else if (!transaction.entityId) {
      this.setState({ errorMessage: 'No Entity is found', message: '' })
      return false;
    }

    else if (!transaction.tranStatus) {
      this.setState({ errorMessage: 'Transaction status is mandatory', message: '' })

      return false;
    }

    return true;
  }

  editTransaction() {
    let transaction = {
      id:this.state.id,
      amount: this.state.amount,
      tranType: this.state.tranType,
      paymentMode: this.state.paymentMode,
      entityId: this.state.entityId,
      userId: this.props.userId,
      remarks: this.state.remarks,
      tranStatus: this.state.tranStatus,
      tranDate: this.state.tranDate
    }
    if (this.validate(transaction)) {
      TransactionService.editTransaction(transaction)
        .then(
          response => {
            this.setState(this.initialState);
            this.setState({ message: "Transaction Updated Successfully" })
          }
        ).catch(err => {
          this.setState({ errorMessage: 'Transaction could not be updated' })
        }).then(()=>{
          this.props.getTransactions();
        })
    }
  }

  handleClose() {
    this.setState({ openModal: false });
  }


  render() {
    return (

      <div className="container">
        <Modal
          open={this.props.openModal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={this.props.classes.modalStyle}
        >
        
          <div className="container">
            {this.state.message && <div className="alert alert-success" id="site-message">{this.state.message}
              <button type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => this.hideMessageAlert()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>}
            {this.state.errorMessage && <div className="alert alert-warning" role="alert">{this.state.errorMessage}
              <button type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => this.hideErrorAlert()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>}
            <Card>
              <CardContent>
                <React.Fragment>
                  <FormControl className="form-control">
                    <Grid container spacing={3} alignItems="center" justify="center">
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
                          Edit Transaction Form
                          <IconButton fontSize="small" onClick={this.props.handleClose} className="close-button">
                            <Close />
                          </IconButton>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="entityName"
                          label="Entity Name"
                          name="entityName"
                          value={this.state.entityName}
                          fullWidth
                          autoComplete="entityName"
                          style={{ paddingTop: 16 }}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="tranDate"
                          label="Transaction Date"
                          type="date"
                          name="tranDate"
                          style={{ paddingTop: 16 }}
                          value={this.state.tranDate}
                          InputProps={{ inputProps: { max: this.state.today } }}
                          onChange={event => {
                            this.setState({ tranDate: event.target.value })
                          }}
                          fullWidth
                          autoComplete="tranDate"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl className="form-control">
                          <MuiInputLabel id="tranType">Transaction Type</MuiInputLabel>
                          <MuiSelect
                            labelId="tranType"
                            value={this.state.tranType}
                            onChange={event => {
                              this.setState({ tranType: event.target.value })
                            }}

                          >
                            <MuiMenuItem value="credit">Credit</MuiMenuItem>
                            <MuiMenuItem value="debit">Debit</MuiMenuItem>

                          </MuiSelect>
                        </FormControl>

                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl className="form-control">
                          <MuiInputLabel id="paymentMode">Payment Mode</MuiInputLabel>
                          <MuiSelect
                            labelId="paymentMode"
                            value={this.state.paymentMode}
                            onChange={event => {
                              this.setState({ paymentMode: event.target.value })
                            }}

                          >
                            <MuiMenuItem value="Cash">Cash</MuiMenuItem>
                            <MuiMenuItem value="Debit Card">Debit Card</MuiMenuItem>
                            <MuiMenuItem value="Credit Card">Credit Card</MuiMenuItem>
                            <MuiMenuItem value="UPI">UPI</MuiMenuItem>
                          </MuiSelect>
                        </FormControl>

                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="amount"
                          name="amount"
                          type="number"
                          value={this.state.amount}
                          InputProps={{ inputProps: { min: 0 } }}
                          label="Amount"
                          onChange={event => {
                            this.setState({ amount: event.target.value })
                          }}
                          fullWidth
                          autoComplete="amount"
                        />

                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl className="form-control">
                          <MuiInputLabel id="paymentMode">Transaction Status</MuiInputLabel>
                          <MuiSelect
                            labelId="tranStatus"
                            value={this.state.tranStatus}
                            onChange={event => {
                              this.setState({ tranStatus: event.target.value })
                            }}

                          >
                            <MuiMenuItem value="DN">Done</MuiMenuItem>
                            <MuiMenuItem value="PN">Pending</MuiMenuItem>
                          </MuiSelect>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="remarks"
                          name="remaks"
                          label="Remarks"
                          value={this.state.remarks}
                          onChange={event => {
                            this.setState({ remarks: event.target.value })
                          }}
                          fullWidth
                          autoComplete="remarks"
                        />
                      </Grid>
                      <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button variant="contained" color="secondary" type="submit"
                          className="submit-button" onClick={this.editTransaction}>
                          SUBMIT
                        </Button>
                      </Grid>
                    </Grid>
                  </FormControl>
                </React.Fragment>
              </CardContent>
            </Card>
          </div>
        </Modal>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true }) (EditTransactionComponent);


