import React, { Component } from "react";
import { Spinner } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import EntityService from "../../services/EntityService";

const columns  = [
  { field: 'entityName', headerName: 'Entity Name', width: 150 },
  { field: 'entityType', headerName: 'Entity Type', width: 150 },
  { field: 'address', headerName: 'Address', width: 150 },
  { field: 'city', headerName: 'City', width: 100 },
  { field: 'state', headerName: 'State', width: 150 },
  { field: 'zip', headerName: 'Zip', width: 100 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 150 },
];

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
          this.setState({ message: "Error occurred" })
        }
      )
  }

  render() {
    console.log("isLoading" + this.state.isLoading);
    if (this.state.isLoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }else{
      return (
        <div style={{ height: 500, width: '100%' }} class="container">
          <DataGrid rows={this.state.entities} columns={columns} />
        </div>
      );
    }
  }
}

  export default ViewEntityComponent;
  