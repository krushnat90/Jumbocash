import React, { Component } from "react";

import Button from 'react-bootstrap/Button';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import EntityService from "../../services/EntityService";


class AddEntityComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            errorMessage: ''
        }

        this.hideErrorAlert = this.hideErrorAlert.bind(this);
        this.hideMessageAlert = this.hideMessageAlert.bind(this);
        this.addEntity = this.addEntity.bind(this);
        this.validate = this.validate.bind(this);
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

    addEntity(entityFormData) {
        let entity = {
            entityType:entityFormData.entityType,
            entityName:entityFormData.entityName,
            email:entityFormData.email,
            phone:entityFormData.phone,
            address:entityFormData.address,
            state:entityFormData.state,
            city:entityFormData.city,
            zip:entityFormData.zip,
            userId:this.props.userId
        }

        EntityService.addEntity(entity).then(
            response => {
              this.setState({ message: "Entity Added Successfully" })
            }
          ).catch(err => {
            this.state.errorMessage = 'Entity could not be added'
          })
    }

    validate(){
        this.state.errorMessage = '';

        if (!this.props.userId) {
            this.state.errorMessage = 'User id is not net. Cannot proceed for ADD.'
            this.state.message = ''
            return this.state.errorMessage;
        }

        return this.state.errorMessage;
    }

    render() {
        let { entityType, entityName, email, phone, address, state, zip } = this.state;
        return (
            <div class="container">
                <Formik
                    initialValues={{ entityType, entityName, email, phone, address, state, zip }}
                    onSubmit={this.addEntity}
                    validate={this.validate}
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
                                    <label>Entity Type :</label>
                                    <Field className="form-control" component="select" name="entityType" required>
                                        <option value="customer">customer</option>
                                        <option value="vendor">vendor</option>
                                    </Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Entity Name :</label>
                                    <Field className="form-control" type="text" name="entityName" required />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Email :</label>
                                    <Field className="form-control" type="email" name="email" required />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Phone :</label>
                                    <Field className="form-control" type="number" name="phone" min="1000000000" max="9999999999" required />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Address :</label>
                                    <Field className="form-control" type="text" name="address" required />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>City :</label>
                                    <Field className="form-control" type="text" name="city" required />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>State :</label>
                                    <Field className="form-control" type="text" name="state" required />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Zip Code :</label>
                                    <Field className="form-control" type="number" name="zip" min="100000" max="999999" required />
                                </fieldset>
                                <button className="btn btn-success" type="submit" centered>add</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        );

    }

}

export default AddEntityComponent;