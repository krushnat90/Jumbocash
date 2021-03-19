import React, { Component } from "react";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class AddTransactionComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            show:true
        }

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showModal(){
        this.setState({
            show : true
        })
    }

    closeModal(){
        this.setState({
            show : false
        })
        this.props.addButtonClose();
    }
    
    render(){
        return(
            <Modal
        show={this.state.show}
        onHide={this.closeModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
        )
    }
}

export default AddTransactionComponent;