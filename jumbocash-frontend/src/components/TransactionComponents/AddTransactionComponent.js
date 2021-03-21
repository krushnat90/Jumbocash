import React, { Component } from "react";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import EntityService from "../../services/EntityService";
import TransactionService from "../../services/TransactionService";

// import 'react-responsive-modal/styles.css';
// import { Modal } from 'react-responsive-modal';


class AddTransactionComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      show: true,
      message: '',
      errorMessage: ''
    }

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.hideErrorAlert = this.hideErrorAlert.bind(this);
    this.hideMessageAlert = this.hideMessageAlert.bind(this);
    this.getEntities = this.getEntities.bind(this);
    this.validate = this.validate.bind(this);
    this.addTransaction = this.addTransaction.bind(this);
  }

  componentDidMount() {
    this.getEntities();
  }

  showModal() {
    this.setState({
      show: true
    })
  }

  closeModal() {
    this.setState({
      show: false
    })
    this.props.addButtonCloseFunc();
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
    this.state.errorMessage = '';

    if (!transaction.amount) {
      this.state.errorMessage = 'Amount is mandatory'
      this.state.message = ''
      return this.state.errorMessage;
    } else if (transaction.amount < 0) {
      this.state.errorMessage = 'Amount cannot be negative'
      this.state.message = ''
      return this.state.errorMessage;
    }
    if (!transaction.tranType) {
      this.state.errorMessage = 'Transaction Type is mandatory'
      this.state.message = ''
      return this.state.errorMessage;
    }

    else if (!transaction.paymentMode) {
      this.state.errorMessage = 'Payment mode is mandatory'
      this.state.message = ''
      return this.state.errorMessage;
    }

    else if (!transaction.entityId) {
      this.state.errorMessage = 'Entity is mandatory'
      this.state.message = ''
      return this.state.errorMessage;
    }

    else if (!transaction.tranStatus) {
      this.state.errorMessage = 'Transaction status is mandatory'
      this.state.message = ''
      return this.state.errorMessage;
    }

    return this.state.errorMessage;
  }

  getEntities() {
    EntityService.getEntitiesByUserId(this.props.userId).then(
      response => {
        this.setState({
          entities: response.data
        })
      }
    ).catch(error => {
      this.setState({
        errorMessage: 'Could Not fetch entities'
      })
    })
  }

  addTransaction(transactionFormData) {
    let transaction = {
      amount: transactionFormData.amount,
      tranType: transactionFormData.tranType,
      paymentMode: transactionFormData.paymentMode,
      entityId: transactionFormData.entityId,
      userId: this.props.userId,
      remarks: transactionFormData.remarks,
      tranStatus: transactionFormData.tranStatus
    }
    TransactionService.addTransaction(transaction)
      .then(
        response => {
          this.setState({ message: "Transaction Added Successfully" })
        }
      ).catch(err => {
        this.state.errorMessage = 'Transaction could not be added'
      }).then(
        () => {
          this.props.getTransactionsFunc();
        }
      )
  }

  render() {
    let { amount, tranType, paymentMode, entityName, remarks, tranStatus } = this.state;
    return (
      <Modal
        show={this.state.show}
        onHide={this.closeModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ amount, tranType, paymentMode, entityName, remarks, tranStatus }}
            validate={this.validate}
            onSubmit={this.addTransaction}
            enableReinitialize={true}
          >
            {
              (props) => (
                <Form>
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
                  <fieldset className="form-group">
                    <label>Amount</label>
                    <Field className="form-control" type="number" name="amount" min="0" />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Transaction Type :</label>
                    <Field className="form-control" component="select" name="tranType">
                      <option value="credit">credit</option>
                      <option value="debit">debit</option>
                    </Field>
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Payment Mode :</label>
                    <Field className="form-control" component="select" name="paymentMode">
                      <option value="cash">cash</option>
                      <option value="credit card">credit card</option>
                      <option value="debit card">debit card</option>
                      <option value="UPI">UPI</option>
                    </Field>
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Entity :</label>
                    <Field className="form-control" component="select" name="entityId">
                      {this.state.entities.map(
                        entity => <option value={entity.entityId}>{entity.entityName}</option>
                      )}
                    </Field>
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Transaction Status :</label>
                    <Field className="form-control" component="select" name="tranStatus">
                      <option value="DN">done</option>
                      <option value="PN">pending</option>
                    </Field>
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Remarks</label>
                    <Field className="form-control" type="text" name="remarks" />
                  </fieldset>
                  <button className="btn btn-success" type="submit" centered>add</button>
                </Form>
              )
            }
          </Formik>
        </Modal.Body>
      </Modal>
    )
  }
}

export default AddTransactionComponent;