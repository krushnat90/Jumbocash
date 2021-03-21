import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button';
import AddEntityComponent from '../EntityComponents/AddEntityComponent';
import EntityService from "../../services/EntityService";

class ViewEntityComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          entities: [],
          message: null,
          openAddFlag : false,
          userId:2
        }
        this.getHeader = this.getHeader.bind(this);
        this.getEntities = this.getEntities.bind(this);
        this.addButtonOnclick = this.addButtonOnclick.bind(this);
        this.addButtonClose = this.addButtonClose.bind(this);
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
          { id: 'Name', label: 'Name', minWidth: 100, align: 'center' },
          { id: 'Type', label: 'Type', minWidth: 100 , align: 'center' },
          { id: 'Address', label: 'Address', minWidth: 200 , align: 'center' },
          { id: 'City', label: 'City', minWidth: 100 , align: 'center' },
          { id: 'State', label: 'State', minWidth: 100 , align: 'center' },
          { id: 'Zip', label: 'Zip', minWidth: 100 , align: 'center' },
          { id: 'Email', label: 'Email', minWidth: 100 , align: 'center' },
          { id: 'Phone', label: 'Phone', minWidth: 100 , align: 'center' },
        //   {
        //     id: 'Transaction Type',
        //     label: 'Transaction Type',
        //     minWidth: 170,
        //     align: 'right',
        //     format: (value) => value.toLocaleString('en-US'),
        //   },
        //   {
        //     id: 'Payment Mode',
        //     label: 'Payment Mode',
        //     minWidth: 170,
        //     align: 'right',
        //     format: (value) => value.toLocaleString('en-US'),
        //   },
        //   {
        //     id: 'Entity',
        //     label: 'Entity',
        //     minWidth: 170,
        //     align: 'center',
        //     format: (value) => value.toFixed(2),
        //   },
        //   {
        //     id: 'Remarks',
        //     label: 'Remarks',
        //     minWidth: 170,
        //     align: 'center',
        //     format: (value) => value.toFixed(2),
        //   },
        ]
      }

    render() {
        return (
          <div>
            <Button variant="primary" onClick={this.addButtonOnclick}>New Entity</Button>
            {this.state.openAddFlag && 
            <AddEntityComponent addButtonCloseFunc={this.addButtonClose} 
            getEntityFunc={this.getEntities} userId={this.state.userId}/>}
            <hr/>
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
                        <b>
                          {column.label}
                        </b>
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
