import React, { Component } from "react";
import { Spinner } from 'react-bootstrap';
import {
  DataGrid, GridToolbarContainer,
  GridToolbarExport, isOverflown
} from '@material-ui/data-grid';
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import EntityService from "../../services/EntityService";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import EditEntityComponent from '../EntityComponents/EditEntityComponent'

import { makeStyles } from "@material-ui/core/styles";

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
          <div style={{ height: 450, width: '100%' }}>
            <DataGrid className={classes.root} components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              Toolbar: CustomToolbar,
            }}
              onRowSelected={(row) => this.rowSelected(row)}
              rows={this.state.entities} columns={columns}
            />
          </div>
        </div>
      );
    }
  }
}

const useStyles = theme => ({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(25,31,77, 0.7)',
      color: 'white',
      fontWeight: '600'
    },
  },
});

const columns = [
  {
    field: 'entityName', headerName: 'Entity Name', width: 150, renderCell: renderCellExpand,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
  {
    field: 'entityType', headerName: 'Entity Type', width: 100, renderCell: renderCellExpand,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
  {
    field: 'address', headerName: 'Address', width: 200, renderCell: renderCellExpand,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
  {
    field: 'city', headerName: 'City', width: 100, renderCell: renderCellExpand,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
  {
    field: 'state', headerName: 'State', width: 120, renderCell: renderCellExpand,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
  {
    field: 'zip', headerName: 'Zip', width: 100, renderCell: renderCellExpand,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
  {
    field: 'email', headerName: 'Email', width: 200, renderCell: renderCellExpand,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
  {
    field: 'phone', headerName: 'Phone', width: 120, renderCell: renderCellExpand,
    headerClassName: 'super-app-theme--header', headerAlign: 'center', align: 'center'
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}


// Cell Expand Styling
const expandCellStyles = makeStyles(() => ({
  root: {
    alignItems: "center",
    lineHeight: "24px",
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    "& .cellValue": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }
}));


const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = expandCellStyles();
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <div
      ref={wrapper}
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cellDiv}
        style={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <div ref={cellValue} className="cellValue">
        {value}
      </div>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </div>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value ? params.value.toString() : ''}
      width={params.colDef.width}
    />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.any.isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default withStyles(useStyles)(ViewEntityComponent);