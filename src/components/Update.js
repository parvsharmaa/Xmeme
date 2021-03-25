import React, {Component} from 'react';
import {Modal, button, Row, Col, Form} from 'react-bootstrap';
import { Button} from 'react-bootstrap';
import './style.css'
import {Post} from './PostList.js'
import axios from 'axios'
import './PostList.js'


export class Update extends Component{
    constructor(props){
        super(props);
        this.state = {
        name: '',
        caption: '',
        url: '',
        apiurl: 'http://127.0.0.1:8000/memes/'
        }
    }
//


    handlercaptionChange = (event) => {
        this.setState({
            caption: event.target.value
        })
    }

    handlerurlChange = (event) => {
        this.setState({
            url: event.target.value
        })
    }

    checkValidUrl = (url) => {
      //define some image formats
      var types = ['jpg','jpeg','tiff','png','gif','bmp'];

      //split the url into parts that has dots before them
      var parts = url.split('.');

      //get the last part
      var extension = parts[parts.length-1];

      //check if the extension matches list
      if(types.indexOf(extension) !== -1) {
          return true;
      }
    return false
    }


    handleSubmit = event => {
        event.preventDefault();
//        alert(event.target.caption.value);
        const URLCheck = this.checkValidUrl(this.state.url);
      if(!URLCheck){
        alert('Invalid URL')
        return false
      }
        console.log(this.state)
         axios.patch(this.state.apiurl + this.props.data + '/', this.state)
        .then(response =>{
            console.log(response)
            window.location.reload();
        })
        .catch(error =>{
            alert("User already exists!")
            console.log(error)
        })
    }


    render(){
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             Update MEME
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
                    <Row>
                        <Col sm={10}>
                        <Form onSubmit={this.handleSubmit}>
                         <Form.Group controlId="name">
                                <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        required
                                        disabled = "true"
                                        placeholder="Enter the person's name by which this meme is created"
                                        value = {this.props.Oname}
                                    />
                        </Form.Group>
                        <Form.Group controlId="caption">
                                <Form.Label>Caption</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="caption"
                                        required
                                        placeholder="New Caption"
                                        value = {this.state.caption}
                                        onChange = {this.handlercaptionChange}

                                    />
                        </Form.Group>
                                <Form.Group controlId="url">
                                <Form.Label>URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="url"
                                        required
                                        placeholder="New image URL"
                                        value = {this.state.url}
                                        onChange = {this.handlerurlChange}

                                    />
                        </Form.Group>
                        <Form.Group>
                             <Button variant="primary" type="submit"> UPDATE </Button>
                        </Form.Group>
                        </Form>
                        </Col>
                    </Row>
            </div>

          </Modal.Body>
          <Modal.Footer>

            <Button variant ="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
            );
        }
    }