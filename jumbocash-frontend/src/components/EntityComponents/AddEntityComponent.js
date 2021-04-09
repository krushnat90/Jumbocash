import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import EntityService from "../../services/EntityService";
import { Card, CardContent } from "@material-ui/core";
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiSelect from "@material-ui/core/Select";
import MuiMenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';


class AddEntityComponent extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            message: '',
            errorMessage: '',
            entityName: '',
            entityType: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        };
        this.state = this.initialState;

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

    addEntity() {
        // TODO : Form Validation
        let entity = {
            entityType: this.state.entityType,
            entityName: this.state.entityName,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            state: this.state.state,
            city: this.state.city,
            zip: this.state.zip,
            userId: this.props.userId
        }

        if (this.validate(entity)) {
            EntityService.addEntity(entity).then(
                response => {
                    this.setState(this.initialState);
                    this.setState({ message: "Entity Added Successfully" })
                }
            ).catch(err => {
                if (err.response.status === 409) {
                    this.setState({ errorMessage: "This entity already exists." })
                }
                else {
                    this.setState({ errorMessage: 'Entity could not be added' })
                }
            })
        }

    }

    //Basic validation
    validate(entity) {

        if (!entity.entityName) {
            this.setState({ errorMessage: 'Entity name is mandatory', message: '' })
            return false;
        }
        else if (!entity.address) {
            this.setState({ errorMessage: 'Address is mandatory', message: '' })
            return false;
        }
        else if (!entity.state) {
            this.setState({ errorMessage: 'State is mandatory', message: '' })
            return false;
        }

        else if (!entity.city) {
            this.setState({ errorMessage: 'city is mandatory', message: '' })
            return false;
        }

        else if (!entity.zip) {
            this.setState({ errorMessage: 'Zip code is mandatory', message: '' })
            return false;
        }

        else if (!entity.email) {
            this.setState({ errorMessage: 'Email is mandatory', message: '' })
            return false;
        }

        else if (!entity.entityType) {
            this.setState({ errorMessage: 'Entity type is mandatory', message: '' })
            return false;
        }

        else if (!entity.phone) {
            this.setState({ errorMessage: 'Phone is mandatory', message: '' })
            return false;
        }

        return true;
    }


    render() {
        return (
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
                </div>}<Card>
                    <CardContent>
                        <React.Fragment>
                            <Typography variant="h6" gutterBottom>
                                New Entity Registration Form
                    </Typography>
                            <FormControl className="form-control">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="entityName"
                                            name="entityName"
                                            label="Entity Name"
                                            value={this.state.entityName}
                                            onChange={event => {
                                                this.setState({ entityName: event.target.value })
                                            }}
                                            fullWidth
                                            autoComplete="entity-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="address"
                                            name="address"
                                            label="Address"
                                            value={this.state.address}
                                            onChange={event => {
                                                this.setState({ address: event.target.value })
                                            }}
                                            fullWidth
                                            autoComplete="entity address"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="city"
                                            name="city"
                                            label="City"
                                            value={this.state.city}
                                            onChange={event => {
                                                this.setState({ city: event.target.value })
                                            }}
                                            fullWidth
                                            autoComplete="city"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="state"
                                            name="state"
                                            label="State"
                                            value={this.state.state}
                                            onChange={event => {
                                                this.setState({ state: event.target.value })
                                            }}
                                            fullWidth
                                            autoComplete="state"
                                        />

                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="zip"
                                            name="zip"
                                            label="Zip / Postal code"
                                            value={this.state.zip}
                                            onChange={event => {
                                                this.setState({ zip: event.target.value })
                                            }}
                                            fullWidth
                                            autoComplete="zip"
                                            type="number"
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="email"
                                            name="email"
                                            label="Email Address"
                                            value={this.state.email}
                                            onChange={event => {
                                                this.setState({ email: event.target.value })
                                            }}
                                            fullWidth
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* <MuiInputLabel id = "entityType">Entity Type</MuiInputLabel> */}
                                        <FormControl className="form-control">
                                            <MuiInputLabel id="entityType">Entity Type</MuiInputLabel>
                                            <MuiSelect
                                                //onChange={this.handleChange}
                                                labelId="entityType"
                                                value={this.state.entityType}
                                                onChange={event => {
                                                    this.setState({ entityType: event.target.value })
                                                }}

                                            >
                                                <MuiMenuItem value="customer">Customer</MuiMenuItem>
                                                <MuiMenuItem value="vendor">Vendor</MuiMenuItem>
                                            </MuiSelect>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="phone"
                                            name="phone"
                                            label="Contact No"
                                            fullWidth
                                            autoComplete="phone"
                                            value={this.state.phone}
                                            onChange={event => {
                                                this.setState({ phone: event.target.value })
                                            }}
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="secondary" className="submit-button" type="submit" onClick={this.addEntity}>
                                            SUBMIT
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </React.Fragment>
                    </CardContent>
                </Card>

            </div>
        );
    }

}

export default AddEntityComponent;