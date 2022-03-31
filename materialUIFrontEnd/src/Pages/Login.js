import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, InputAdornment, Typography, makeStyles, Box } from "@material-ui/core";
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
        display: 'block',
    },

    passwordField: {
        marginBottom: 45,
        display: 'block',
    },

    button: {
        borderRadius: 10,
    },
})

export default function Login() {

    const classes = useStyles()
    const navigate = useNavigate()
    const [username, setUser] = useState('')
    const [password, setPass] = useState('')
    const [userError, setUserError] = useState(false)
    const [passError, setPassError] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        setUserError(false)
        setPassError(false)

        if (username === '') {
            setUserError(true)
        }

        if (password === '') {
            setPassError(true)
        }

        if (username && password) {
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
                    Welcome Back!
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

                <Box id="login-button/signup" alignItems="center" pl={65}>
                    <Button
                        id="login"
                        className={classes.button}
                        variant="contained"
                        type="submit"
                        endIcon={<ArrowRightRoundedIcon fontSize='large' />}
                        style={{ fontSize: 18, maxHeight: 30 }}
                    >
                        Login
                    </Button>

                    <Button
                        id="signup"
                        className={classes.button}
                        variant="contained"
                        endIcon={<ArrowRightRoundedIcon fontSize='large' />}
                        style={{ fontSize: 18, maxHeight: 30 }}
                        onClick={() => navigate('/Signup')}
                    >
                        New User?
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
