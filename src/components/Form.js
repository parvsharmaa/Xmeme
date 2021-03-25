import React, {Component} from 'react'
import axios from 'axios'
import './style.css'

export class Form extends Component{

    constructor(props){
        super(props)
        this.state = {
        name: '',
        caption: '',
        url:''
        }
    }

    handlernameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

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

    validate = () => {
        let nameError = "";
        let captionError = "";
        let urlError = "";
        if(!this.state.name){
            nameError = "Name cannot be empty"
        }
        if(!this.state.caption){
            captionError = "PLease provide caption"
        }
        if(!this.state.url){
            urlError = "URL field is empty"
        }
        if(this.state.caption.length > 100){
            alert("Caption is too large");
            return false;
        }
        if(nameError){
            this.setState({ nameError })
            return false;
        }
        if(captionError){
            this.setState({ captionError })
            return false;
        }
        if(urlError){
            this.setState({ urlError })
            return false;
        }
        return true;
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


    handlerSubmit = event => {
      event.preventDefault()
      const isValid = this.validate();
      const URLCheck = this.checkValidUrl(this.state.url);
      if(!URLCheck){
        alert('Invalid URL')
        return false
      }

      if (isValid){
      console.log(this.state)
      axios.post('http://127.0.0.1:8000/memes/', this.state)
        .then(response =>{
            console.log(response)
            window.location.reload();
        })
        .catch(error =>{
            alert("User already exists!")
            console.log(error)
        })
      }
    }
    render(){
        return (
            <form onSubmit={this.handlerSubmit}>
                <div>
                    <label> Meme Owner* </label> <br />
                    <input type = 'text' placeholder="Enter your full name" size="100"
                    value = {this.state.name}
                    onChange = {this.handlernameChange} />
                    <div style={{fontSize: 12, color: "red"}}>
                        {this.state.nameError}
                    </div>
                </div>

                <div>
                    <label> Caption* <i>(MAX 100 Words)</i> </label> <br />
                    <input type = 'text' placeholder="Be creative with the caption" size="100"
                    value = {this.state.caption}
                    onChange = {this.handlercaptionChange} />
                    <div style={{fontSize: 12, color: "red"}}>
                        {this.state.captionError}
                    </div>
                </div>

                <div>
                    <label> Meme URL* </label> <br />
                    <input type = 'text' placeholder="Enter URL of your meme here" size="75"
                    value = {this.state.url}
                    onChange = {this.handlerurlChange} />
                    <div style={{fontSize: 12, color: "red"}}>
                        {this.state.urlError}
                    </div>
                </div>
                <br/>
                <button className="button" type="submit">Submit Meme</button>

            </form>
        )
    }
}

export default Form