import React, { Component } from "react";
import { Spinner } from 'react-bootstrap';
import {
  DataGrid, GridToolbarContainer,
  GridToolbarExport
} from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import EntityService from "../../services/EntityService";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import Modal from '@material-ui/core/Modal';
import EditEntityComponent from '../EntityComponents/EditEntityComponent'

const columns = [
  { field: 'entityName', headerName: 'Entity Name', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
  { field: 'entityType', headerName: 'Entity Type', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
  { field: 'address', headerName: 'Address', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
  { field: 'city', headerName: 'City', width: 100, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
  { field: 'state', headerName: 'State', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
  { field: 'zip', headerName: 'Zip', width: 100, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
  { field: 'email', headerName: 'Email', width: 200, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
  { field: 'phone', headerName: 'Phone', width: 150, headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center' },
];

const useStyles = theme => ({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(25,31,77, 0.7)',
      color: 'white',
      fontWeight: '600'
    },
  },
});

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

class ViewEntityComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      entities: [],
      message: null,
      openAddFlag: false,
      openModal: false,
      userId: props.userId,
      entityToEdit: null
    }
    this.getEntities = this.getEntities.bind(this);
    this.editEntity = this.editEntity.bind(this);
    this.deleteEntity = this.deleteEntity.bind(this);
    this.rowSelected = this.rowSelected.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.getEntities();
  }

  getEntities() {
    EntityService.getEntitiesByUserId(this.state.userId).then(
      response => {
        this.setState({
          entities: response.data,
          isLoading: false
        })
      }
    ).catch(
      error => {
        this.setState({ message: "Error occurred", isLoading: false })
      }
    )

    if (this.state.entities === null) {
      this.setState({ entities: [] });
    }
  }

  editEntity() {
    if (this.state.entityToEdit != null) {
      this.setState({ openModal: true });
    }
  }

  deleteEntity() {

  }

  handleClose() {
    this.setState({ openModal: false });
  }

  async rowSelected(row) {
    await this.setState({ entityToEdit: row.data });
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
              onClick={this.editEntity}>
              Edit
            </Button>
            <Button variant="outlined" size="medium" color="primary"
              startIcon={<DeleteTwoToneIcon fontSize="small" />}
              onClick={this.deleteEntity}>
              Delete
            </Button>
            <Modal
              open={this.state.openModal}
              onClose={this.handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <EditEntityComponent userId={this.props.userId}
                entityToEdit={this.state.entityToEdit}
                openModal={this.state.openModal}
                handleClose={this.handleClose}
              />
            </Modal>
          </div>
          <br />
          <DataGrid className={classes.root} components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            Toolbar: CustomToolbar,
          }}
            onRowSelected={(row) => this.rowSelected(row)}
            rows={this.state.entities} columns={columns}
          />
        </div>
      );
    }
  }
}

export default withStyles(useStyles)(ViewEntityComponent);