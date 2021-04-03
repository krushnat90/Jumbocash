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
import {
    DataGrid, GridToolbarContainer,
    GridToolbarExport
} from '@material-ui/data-grid';
import TransactionService from "../../services/TransactionService";
import CustomNoRowsOverlay from '../TransactionComponents/CustomNoRowsOverlay'
import LocalShippingTwoToneIcon from '@material-ui/icons/LocalShippingTwoTone';
import SwapHorizontalCircleTwoToneIcon from '@material-ui/icons/SwapHorizontalCircleTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';

import { cashflow as data } from '../../demo-data/data';

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
    //{ field: 'tranId', headerName: 'Id', width: 150 },
    { field: 'tranDate', headerName: 'Date', width: 120, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
    { field: 'entityName', headerName: 'Entity Name', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
    // { field: 'paymentMode', headerName: 'Payment Mode', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
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
    // {
    //     field: 'tranStatus', headerName: 'Status', width: 100, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center', cellClassName: (params) =>
    //         clsx('tranStatus', {
    //             pending: params.value === 'Pending',
    //             done: params.value === 'Done'
    //         }),
    // },
    // { field: 'remarks', headerName: 'Remarks', width: 250, headerClassName: 'super-app-theme--header', align: 'center', headerAlign: 'center' }
];



class DashboardComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data,
            transactions: [],
            userId : props.userId
        };
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
        const { data: chartData } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <AccountBalanceWalletTwoToneIcon className="blue-color" fontSize='large' />
                            <Typography variant="subtitle1">Total Cash In</Typography>
                            <Typography variant="h6" className="green-color"><b>₹10000</b></Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <SwapHorizontalCircleTwoToneIcon className="purple-color" fontSize='large' />
                            <Typography variant="subtitle1">Total Cash Out</Typography>
                            <Typography variant="h6" className="red-color"><b>₹5000</b></Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <ShoppingCartTwoToneIcon className="magenta-color" fontSize='large' />
                            <Typography variant="subtitle1">Total Customers</Typography>
                            <Typography variant="h6" className="skyblue-color"><b>57</b></Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <LocalShippingTwoToneIcon className="pink-color" fontSize='large' />
                            <Typography variant="subtitle1">Total Vendors</Typography>
                            <Typography variant="h6" className="lavender-color"><b>34</b></Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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