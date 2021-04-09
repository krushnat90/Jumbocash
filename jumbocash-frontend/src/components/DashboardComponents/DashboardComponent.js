import React, { Component } from "react";
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { DataGrid } from '@material-ui/data-grid';
import TransactionService from "../../services/TransactionService";
import CustomNoRowsOverlay from '../TransactionComponents/CustomNoRowsOverlay'
import LocalShippingTwoToneIcon from '@material-ui/icons/LocalShippingTwoTone';
import SwapHorizontalCircleTwoToneIcon from '@material-ui/icons/SwapHorizontalCircleTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import UserService from "../../services/UserService";



const format = () => tick => tick;
const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendLabelStyles = theme => ({
    label: {
        paddingTop: theme.spacing(1),
        whiteSpace: 'nowrap',
    },
});
const legendItemStyles = () => ({
    item: {
        flexDirection: 'column',
    },
});

const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const demoStyles = () => ({
    chart: {
        paddingRight: '20px',
    },
    title: {
        whiteSpace: 'pre',
    },
});

const ValueLabel = (props) => {
    const { text } = props;
    return (
        <ValueAxis.Label
            {...props}
            text={`₹${text}`}
        />
    );
};

const titleStyles = theme => ({
    title: {
        whiteSpace: 'pre',
        fontSize: '120%',
        color: theme.palette.text.secondary
    },
});

const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
    <Title.Text {...props} className={classes.title} />
));

const useStyles = theme => ({
    root: {
        flexGrow: 1,
        '& .super-app-theme--header': {
            //backgroundColor: 'rgba(114,74,157,0.8)',
            color: theme.palette.text.secondary,
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
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
});

const columns = [
    { field: 'tranDate', headerName: 'Date', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
    { field: 'entityName', headerName: 'Entity Name', width: 190, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
    {
        field: 'tranType', headerName: 'Type', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
        , cellClassName: (params) =>
            clsx('tranType', {
                credit: params.value === 'credit',
                debit: params.value === 'debit',
            }),
    },
    {
        field: 'amount', headerName: 'Amount', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', cellClassName: (params) =>
            clsx('amount', {
                positive: params.value > 0,
                negative: params.value < 0
            }),
    },
];



class DashboardComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            analysisData: [],
            userSummaryInformation: {
                "totalCashIn": 0,
                "totalCustomers": 0,
                "totalVendors": 0,
                "totalCashOut": 0
            },
            errorMessage: '',
            transactions: [],
            userId: props.userId,
            isLoading: true
        };

        this.fetchUserSummaryInformation = this.fetchUserSummaryInformation.bind(this);
        this.hideErrorAlert = this.hideErrorAlert.bind(this);
        this.getTransactions = this.getTransactions.bind(this);
        this.hideErrorAlert = this.hideErrorAlert.bind(this);
        this.fetchAnalysisData = this.fetchAnalysisData.bind(this);
    }

    fetchUserSummaryInformation() {
        UserService.getUserSummaryInfo(this.props.userId).then(
            response => {
                this.setState({
                    userSummaryInformation: response.data
                })
            }
        ).catch((error) => {
            this.setState(
                {
                    errorMessage: 'Something went wrong! Please re-login and try again'
                }
            )
        })
    }

    fetchAnalysisData() {
        TransactionService.getLastSixMonthsTransactionSummary(this.props.userId).then(
            response => {
                this.setState({
                    analysisData: response.data
                })
            }
        ).catch((error) => {
            this.setState(
                {
                    errorMessage: 'Something went wrong! Please re-login and try again'
                }
            )
        })
    }


    componentDidMount() {
        this.fetchAnalysisData();
        this.getTransactions();
        this.fetchUserSummaryInformation();
    }

    getTransactions() {
        TransactionService.getTransactionsByUserIdWithLimit(this.props.userId, 10).then(
            response => {
                this.setState({
                    transactions: response.data,
                    isLoading: false
                })

            }
        ).catch(
            error => {
                if (error.response.status == 404) {
                    this.setState({
                        errorMessage: 'No Transactions Found! Please add some...'
                    })
                }
                else {
                    this.setState({
                        errorMessage: 'Something went wrong! Please re-login and try again',
                        isLoading: false
                    })
                }
            }
        )
    }

    //close button functionality for error
    hideErrorAlert() {
        this.setState({
            errorMessage: false,
        });
    }

    componentDidMount() {
        this.fetchAnalysisData();
        this.fetchUserSummaryInformation();
        this.getTransactions();
    }


    render() {
        const { analysisData: chartData } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.state.errorMessage && <div className="alert alert-warning" role="alert">{this.state.errorMessage}
                    <button type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                        onClick={() => this.hideErrorAlert()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper}>
                            <AccountBalanceWalletTwoToneIcon className="blue-color" fontSize='large' />
                            <Typography variant="subtitle1">Total Cash In</Typography>
                            <Typography variant="h6" className="green-color"><b>₹{this.state.userSummaryInformation.totalCashIn}</b></Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper}>
                            <SwapHorizontalCircleTwoToneIcon className="purple-color" fontSize='large' />
                            <Typography variant="subtitle1">Total Cash Out</Typography>
                            <Typography variant="h6" className="red-color"><b>₹{this.state.userSummaryInformation.totalCashOut}</b></Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper}>
                            <ShoppingCartTwoToneIcon className="magenta-color" fontSize='large' />
                            <Typography variant="subtitle1">Total Customers</Typography>
                            <Typography variant="h6" className="skyblue-color"><b>{this.state.userSummaryInformation.totalCustomers}</b></Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper}>
                            <LocalShippingTwoToneIcon className="pink-color" fontSize='large' />
                            <Typography variant="subtitle1">Total Vendors</Typography>
                            <Typography variant="h6" className="lavender-color"><b>{this.state.userSummaryInformation.totalVendors}</b></Typography>

                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Paper>
                            <Chart
                                data={chartData}
                                className={classes.chart}
                            >
                                <ArgumentAxis tickFormat={format} />
                                <ValueAxis
                                    max={10000}
                                    labelComponent={ValueLabel}
                                />

                                <LineSeries
                                    name="Credit"
                                    valueField="credit"
                                    argumentField="month"
                                />
                                <LineSeries
                                    name="Debit"
                                    valueField="debit"
                                    argumentField="month"
                                />
                                <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                                <Title
                                    text={`Last Six Months Transaction Distribution`}
                                    textComponent={TitleText}
                                />
                                <Animation />
                            </Chart>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper>
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
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default withStyles(useStyles)(DashboardComponent);