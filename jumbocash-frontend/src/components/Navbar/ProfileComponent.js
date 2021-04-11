import { Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from "react";

const styles = theme => ({
    profilePaperStyle: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
});

class ProfileComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: null,
            userName: '',
            userEmail: '',
            userImgUrl: ''
        };

        this.hideMessageAlert = this.hideMessageAlert.bind(this);
        this.loadUserDataFromSession = this.loadUserDataFromSession.bind(this);

    }

    //close button functionality for message
    hideMessageAlert() {
        this.setState({
            message: false,
            
        });
    }

    componentDidMount() {
        console.log("Profile component");
        this.loadUserDataFromSession();
        
    }

    loadUserDataFromSession() {
        var name = sessionStorage.getItem("JUMBO_USER_NAME");
        var email = sessionStorage.getItem("JUMBO_EMAIL");
        var imgUrl = sessionStorage.getItem("JUMBO_IMG_URL")
        // console.log(userName);
        if (name && email && imgUrl) {
            this.setState({
                userName: name,
                userEmail: email,
                userImgUrl: imgUrl
            })
            console.log(this.state);
        }
        
    }

    render() {
        return (
            <div className='container'>
                {this.state.message && <div className="alert alert-warning" role="alert">{this.state.message}
                    <button type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                        onClick={() => this.hideMessageAlert()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                <Grid container justify="center">
                    {/* <Grid item xs={12} sm={6}> */}

                    <Paper elevation={3} className={this.props.classes.profilePaperStyle}>
                    <Typography variant="h5" gutterBottom><b>
                               !----------------! Profile Information !----------------!
                               </b>
                    </Typography>
                    <img src={this.state.userImgUrl} />
                        <Typography variant="h5">Name : {this.state.userName}</Typography>
                        <Typography variant="h5">Email : {this.state.userEmail}</Typography>
                        
                    </Paper>
                    {/* </Grid> */}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ProfileComponent);