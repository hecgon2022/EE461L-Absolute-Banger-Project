import React, { useState } from 'react';
import {TextField, Button, InputAdornment, Grid, Typography, makeStyles } from "@material-ui/core";
import "./Profile.css";
import axios from "axios"
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded'
import { VpnKeyRounded } from '@material-ui/icons';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';


const useStyles = makeStyles({
    text: {
      marginTop: 20, 
      marginBottom: 130,
      display: 'block',
    },

    userField: {
        marginBottom: 10,
        display: 'block'
    },

    passwordField: {
        marginBottom: 45,
        display: 'block'
    }
  })

export default function Login(){

    const classes = useStyles()
    const [username, setUser] = useState('')
    const [password, setPass] = useState('')
    const [userError, setUserError] = useState(false)
    const [passError, setPassError] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        setUserError(false)
        setPassError(false)

        if (username == ''){
            setUserError(true)
        }

        if (password == ''){
            setPassError(true)
        }

        if (username && password){
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
    }

        return (
            <Grid 
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                
                <Typography 
                    variant='h1'
                    className={classes.text}
                >
                    Welcome     
                </Typography>
               

                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField 
                        id="user-input"
                        className={classes.userField} 
                        label="Username"
                        color="secondary"
                        onChange={
                            (e) => setUser(e.target.value)
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountBoxRoundedIcon />
                                </InputAdornment>
                            )
                        }} 
                        required
                        //fullWidth
                        style={{width: '200%'}}
                        error={userError}
                    />
                    <TextField
                        id="password-input"
                        className={classes.passwordField}
                        type="password"
                        label="Password"
                        color="secondary"
                        onChange={
                            (e) => setPass(e.target.value)
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyRounded />
                                </InputAdornment>
                            )
                        }} 
                        autoComplete="current-password"
                        required
                        fullWidth
                        error={passError}
                    />
                    <Button 
                        variant="contained"
                        type="submit"
                        endIcon={<ArrowRightRoundedIcon fontSize='large'/>}
                    >
                        Login
                    </Button>
                </form>
            </Grid>
        );
}
