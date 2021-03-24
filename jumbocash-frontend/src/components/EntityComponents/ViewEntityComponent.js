import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableSortLabel,
  TableContainer,
  Paper
} from "@material-ui/core";
import Button from 'react-bootstrap/Button';
import AddEntityComponent from '../EntityComponents/AddEntityComponent';
import EntityService from "../../services/EntityService";
import DeepCopy from "./DeepCopy";

class ViewEntityComponent extends Component {

  constructor(props) {
    super(props);
    var defaultSortBy = "entityName";
    var defaultSortOrder = "asc";
    this.state = {
      entities: [],
      message: null,
      openAddFlag: false,
      userId: props.userId,
      sortBy: defaultSortBy, // default sort column
      sortOrder: defaultSortOrder // default sort oder
    }

    this.getHeader = this.getHeader.bind(this);
    this.getEntities = this.getEntities.bind(this);
    this.addButtonOnclick = this.addButtonOnclick.bind(this);
    this.addButtonClose = this.addButtonClose.bind(this);
    this.requestSort = this.requestSort.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  sortData(sortBy, sortOrder, entities) {
    var itemsToSort = DeepCopy(entities || this.state.entities);
    var sortedItems = [];
    var compareFn = null;
    switch (sortBy) {
      case "entityName":
        compareFn = (i, j) => {
          if (i.entityName < j.entityName) {
            return sortOrder === "asc" ? -1 : 1;
          } else {
            if (i.entityName > j.entityName) {
              return sortOrder === "asc" ? 1 : -1;
            } else {
              return 0;
            }
          }
        };
        break;
      case "entityType":
        compareFn = (i, j) => {
          if (i.entityType < j.entityType) {
            return sortOrder === "asc" ? -1 : 1;
          } else {
            if (i.entityType > j.entityType) {
              return sortOrder === "asc" ? 1 : -1;
            } else {
              return 0;
            }
          }
        };
        break;

      default:
        break;
    }
    sortedItems = itemsToSort.sort(compareFn);
    return sortedItems;
  }

  requestSort(pSortBy) {
    var sortBy = this.state.sortBy;
    var sortOrder = this.state.sortOrder;
    return event => {
      if (pSortBy === this.state.sortBy) {
        sortOrder = sortOrder === "asc" ? "desc" : "asc";
      } else {
        sortBy = pSortBy;
        sortOrder = "asc";
      }
      var sortedEntities = this.sortData(sortBy, sortOrder);
      this.setState({
        sortOrder: sortOrder,
        sortBy: sortBy,
        entities: sortedEntities
      });
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  getEntities() {
    EntityService.getEntitiesByUserId(this.state.userId).then(
      response => {
        this.setState({
          entities: response.data
        })
        console.log(response.data);
      }

    ).catch(
      error => {
        this.setState({ message: "Error occurred" })
      }
    )
  }

  addButtonOnclick() {
    this.setState({
      openAddFlag: true
    })
  }

  addButtonClose() {
    this.setState({
      openAddFlag: false
    })
  }

  getHeader() {
    return [
      { id: 'entityName', label: 'Name', minWidth: 100, align: 'center' },
      { id: 'entityType', label: 'Type', minWidth: 100, align: 'center' },
      { id: 'address', label: 'Address', minWidth: 200, align: 'center' },
      { id: 'city', label: 'City', minWidth: 100, align: 'center' },
      { id: 'state', label: 'State', minWidth: 100, align: 'center' },
      { id: 'zip', label: 'Zip', minWidth: 100, align: 'center' },
      { id: 'email', label: 'Email', minWidth: 100, align: 'center' },
      { id: 'phone', label: 'Phone', minWidth: 100, align: 'center' },

    ]
  }

  render() {
    return (
      <div class='container'>
        <Button variant="primary" onClick={this.addButtonOnclick}>New Entity</Button>
        {this.state.openAddFlag &&
          <AddEntityComponent addButtonCloseFunc={this.addButtonClose}
            getEntityFunc={this.getEntities} userId={this.state.userId} />}
        <hr />
        <TableContainer component={Paper}>

          <Table size="small" aria-label="a dense table">

            <TableHead>
              <TableRow>
                {this.getHeader().map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <TableSortLabel
                      active={this.state.sortBy === column.id}
                      direction={this.state.sortOrder}
                      onClick={this.requestSort(column.id)}
                    >
                      <b>
                        {column.label}
                      </b>
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.entities.map(
                  entity =>
                    <TableRow key={entity.entityId}>
                      <TableCell align="center">{entity.entityName}</TableCell>
                      <TableCell align="center">{entity.entityType}</TableCell>
                      <TableCell align="center">{entity.address}</TableCell>
                      <TableCell align="center">{entity.city}</TableCell>
                      <TableCell align="center">{entity.state}</TableCell>
                      <TableCell align="center">{entity.zip}</TableCell>
                      <TableCell align="center">{entity.email}</TableCell>
                      <TableCell align="center">{entity.phone}</TableCell>
                    </TableRow>

                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

export default ViewEntityComponent
