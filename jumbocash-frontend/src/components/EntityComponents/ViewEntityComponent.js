import React, { Component } from "react";
import { Spinner } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import EntityService from "../../services/EntityService";
import { withStyles } from '@material-ui/core/styles';


const columns  = [
  { field: 'entityName', headerName: 'Entity Name', width: 150 , headerClassName: 'super-app-theme--header', headerAlign: 'center', align : 'center'},
  { field: 'entityType', headerName: 'Entity Type', width: 150 , headerClassName: 'super-app-theme--header', headerAlign: 'center', align : 'center'},
  { field: 'address', headerName: 'Address', width: 150 , headerClassName: 'super-app-theme--header', headerAlign: 'center', align : 'center'},
  { field: 'city', headerName: 'City', width: 100 , headerClassName: 'super-app-theme--header', headerAlign: 'center', align : 'center'},
  { field: 'state', headerName: 'State', width: 150 , headerClassName: 'super-app-theme--header', headerAlign: 'center', align : 'center'},
  { field: 'zip', headerName: 'Zip', width: 100 , headerClassName: 'super-app-theme--header', headerAlign: 'center', align : 'center'},
  { field: 'email', headerName: 'Email', width: 200 , headerClassName: 'super-app-theme--header', headerAlign: 'center', align : 'center'},
  { field: 'phone', headerName: 'Phone', width: 150 , headerClassName: 'super-app-theme--header', headerAlign: 'center', align : 'center'},
];

const useStyles = theme => ({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(73,79,175, 0.7)',
      color: 'white',
      fontWeight : '600'
    },
  },
});



class ViewEntityComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      entities: [],
      message: null,
      openAddFlag: false,
      userId: props.userId
    }
    this.getEntities = this.getEntities.bind(this);
  }

  componentDidMount() {
    this.getEntities();
  }

  getEntities() {
    EntityService.getEntitiesByUserId(this.state.userId).then(
      response => {
        this.setState({
          entities: response.data,
          isLoading : false
        })
        console.log(response.data);
      }
    ).catch(
        error => {
          this.setState({ message: "Error occurred", isLoading : false})
        }
      )

      if(this.state.entities === null){
        this.setState({entities : []});
      }
  }

  render() {
    const { classes } = this.props;
    console.log("isLoading" + this.state.isLoading);
    if (this.state.isLoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }else{
      return (
        <div style={{ height: 500, width: '100%' }} className="container">
          <DataGrid className={classes.root} components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            rows={this.state.entities} columns={columns} 
          />
        </div>
      );
    }
  }
}

export default withStyles(useStyles)(ViewEntityComponent);