import React from 'react';
import {TextField, Button} from "@material-ui/core";
import "./Profile.css";
import axios from "axios"

class LogIn extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: ""
        };
    }

    handleSubmit(event) {
        var username = this.state.user;
        var password = this.state.pass;
    
        event.preventDefault();
    
        // do something with form values, and then
        axios.post("https://www.pythonurl.herokuapp.com", {
            user: username,
            pass: password
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
          //we have to then return the profile depending on the log in information here.
      }

    render() {
        return (
            <div className='vertical-container'>
            <h1>Sign In Screen</h1>
            <TextField 
                id="outlined-basic" 
                label="UserName"
                onChange={
                    (e) => this.setState(() => ({
                        user: e.target.value
                    }))
                } 
                variant="outlined" />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                onChange={
                    (e) => this.setState(() => ({
                        pass: e.target.value
                    }))
                }
                autoComplete="current-password"
              />
            <Button variant="contained">Log In</Button>
          </div>
        );
      }

}


export default LogIn;