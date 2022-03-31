import React, { useState } from 'react';
import {TextField, Button, InputAdornment, Grid, Typography, makeStyles, Box } from "@material-ui/core";
import "./Profile.css";
import axios from "axios"
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded'
import { VpnKeyRounded } from '@material-ui/icons';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';


const useStyles = makeStyles({
    text: {
      marginTop: 20, 
      marginBottom: 130,
      display: 'block',
    },

    userField: {
        marginBottom: 10,
        display: 'block',
    },

    passwordField: {
        marginBottom: 10,
        display: 'block',
    },

    confirmField: {
        marginBottom: 45,
        display: 'block',
    },

    button: {
        borderRadius: 10,
      }, 
  })

export default function Signup(){

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
            <Box id="container">
                <Box id="welcome-text" textAlign="center">
                    <Typography 
                        variant='h1'
                        className={classes.text}
                    >
                        Welcome, New User!
                    </Typography>
                </Box>

                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Box id="user-input" alignItems="center" px={55}>
                        <TextField 
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
                                ),
                                style: {
                                    fontSize: 24,
                                },
                            }} 
                            InputLabelProps={{ 
                                style: { fontSize: 22 } 
                            }}
                            required
                            fullWidth
                            error={userError}
                        />
                    </Box>

                    <Box id="pass-input" alignItems="center" px={55}>
                        <TextField
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
                                ),
                                style: {
                                    fontSize: 24,
                                },
                            }} 
                            InputLabelProps={{ 
                                style: { fontSize: 22 } 
                            }}
                            autoComplete="current-password"
                            required
                            fullWidth
                            error={passError}
                        />
                    </Box>

                    <Box id="confirm-input" alignItems="center" px={55}>
                        <TextField
                            className={classes.confirmField}
                            type="password"
                            label="Confirm Password"
                            color="secondary"
                            onChange={
                                (e) => setPass(e.target.value)
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CheckCircleRoundedIcon />
                                    </InputAdornment>
                                ),
                                style: {
                                    fontSize: 24,
                                },
                            }} 
                            InputLabelProps={{ 
                                style: { fontSize: 22 } 
                            }}
                            autoComplete="current-password"
                            required
                            fullWidth
                            error={passError}
                        />
                    </Box>

                    <Box id="signup-button/login" alignItems="center" pl={65}>
                        <Button 
                            id="signup"
                            className={classes.button} 
                            variant="contained"
                            type="submit"
                            endIcon={<ArrowRightRoundedIcon fontSize='large'/>}
                            style={{ fontSize: 18, maxHeight: 30 }}
                        >
                            Sign Up
                        </Button>

                        <Button
                            id="login"
                            className={classes.button}
                            variant="contained"
                            endIcon={<ArrowRightRoundedIcon fontSize='large'/>}
                            style={{ fontSize: 18, maxHeight: 30 }}
                        >
                            Returning User?
                        </Button>
                    </Box>
                </form>
            </Box>
        );
}
