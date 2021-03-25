import React, { Component } from 'react'
import axios from 'axios'
import './style.css'
import EditIcon from '@material-ui/icons/Edit';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Update} from './Update';

//get request
class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [], addModalShow : false,
            errorMsg: '', currentid : -1, ownername: ''
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/memes/')
        .then(response => {
            console.log(response)
            this.setState({posts: response.data})
        })
        .catch(error => {
            console.log(error)
            this.setState({errorMsg: 'Error Retrieving data'})
        })
    }

    render(){
        const { posts, errorMsg } = this.state
        let addModalClose = () => this.setState({addModalShow:false});
        return (
            <div>

                <h4>List of Posts</h4>
                {
                    posts.length ?
                    posts.map(post => <div key={post.name}>
                       <div className="container">
                            <div className="gallery">
                                <button
                                    className="button1"
                                    id = "{post.id}"
                                    variant='primary'
                                    onClick={()=> {this.setState({addModalShow: true});this.state.currentid = post.id; this.state.ownername = post.name}}> <EditIcon />
                                 </button>
                                <div className="name">{post.name}</div>{<img src={post.url}/>}
                                    <Update
                                        show={this.state.addModalShow}
                                        data={this.state.currentid}
                                        Oname={this.state.ownername}
                                        onHide={addModalClose} />
                                <div className="desc">"{post.caption}"</div>
                             </div>
                       </div>
                    </div>) : null
                }
                {errorMsg ? <div> {errorMsg} </div> : null}
                </div>
        )
    }
}


export default PostList