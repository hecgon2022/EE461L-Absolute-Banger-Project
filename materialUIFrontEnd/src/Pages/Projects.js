import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, InputAdornment, Typography, makeStyles, Box, Container, Card, CardContent, Grid, Paper } from "@material-ui/core";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import CardHeader from "@material-ui/core/CardHeader";
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
    marginBottom: 10,
    display: 'block',
  },

  fundsField: {
    marginBottom: 45,
    display: 'block',
  },

  button: {
    borderRadius: 10,
  },

  createForm: {
    maxHeight: 400,
  },

  grid: {
    marginTop: 50,
  },

  projectTable: {
    display: "block",
    maxHeight: 500,
  }

})

export default function Projects( user ) {

  const classes = useStyles()
  const [projectID, setProjectID] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectFunds, setProjectFunds] = useState('')
  const [projectIDError, setProjectIDError] = useState(false)
  const [projectDescriptionError, setProjectDescriptionError] = useState(false)
  const [projectFundsError, setProjectFundsError] = useState(false)


  const handleSubmit = (event) => {
    event.preventDefault();

    setProjectIDError(false)
    setProjectDescriptionError(false)
    setProjectFundsError(false)

    if (projectID === '') {
      setProjectIDError(true)
    }

    if (projectDescription === '') {
      setProjectDescriptionError(true)
    }

    if (projectFunds === '') {
      setProjectFundsError(true)
    }

    if (projectID && projectDescription && projectFunds) {

      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "projectID": projectID, "projectDescription": projectDescription, "projectFunds": projectFunds, "user": user })
      }

      fetch("/projects/", requestOptions)
        .then(response =>
          response.json()
        )
        .then(data => {
          // console.log(data.output)
          if (data.output === "User Found") {
            // Update our user status
            
          } else {

          }
        })
        .catch(error => {
          console.log(error)
        })

      //we have to then return the profile depending on the log in information here.
      //this is the end of the if statement
    }
  }

  return (

    <Container>

      <Typography
        variant='h2'>
        Projects Page
      </Typography>

      <Grid container spacing={1} className={classes.grid}>

        <Grid item xs={6} md={4} className={classes.createForm}>
          <Box className={classes.createForm}>
            <Card elevation={1} className={classes.createForm}>

              <CardHeader
                title={
                  <Typography
                    variant='h4'
                    classname={classes.formHeader}>
                    Create New Project
                  </Typography>}
              />

              <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                  <Box id="projectID-input">
                    <TextField
                      className={classes.userField}
                      label="Project ID"
                      color="secondary"
                      onChange={
                        (e) => setProjectID(e.target.value)
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
                      error={projectIDError}
                    />
                  </Box>

                  <Box id="projectDesc-input">
                    <TextField
                      className={classes.passwordField}
                      label="Project Description"
                      color="secondary"
                      onChange={
                        (e) => setProjectDescription(e.target.value)
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
                      autoComplete="current-projectDescripton"
                      required
                      fullWidth
                      error={projectDescriptionError}
                    />
                  </Box>

                  <Box id="funds-input">
                    <TextField
                      className={classes.fundsField}
                      label="Funds"
                      color="secondary"
                      onChange={
                        (e) => setProjectFunds(e.target.value)
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
                      autoComplete="current-funds"
                      required
                      fullWidth
                      error={projectFundsError}
                    />
                  </Box>

                  <Box id="login-button/signup">
                    <Button
                      id="Create Project"
                      className={classes.button}
                      variant="contained"
                      type="submit"
                      endIcon={<ArrowRightRoundedIcon fontSize='large' />}
                      style={{ fontSize: 18, maxHeight: 30 }}
                    >
                      Create
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Grid>


        <Grid item xs={6} md={8}>
          <Table>
            <TableContainer component={Paper} className={classes.projectTable}>
              <Table stickyHeader sx={{ maxHeight: "max-content" }} aria-label="simple table">

                <TableHead>
                  <TableRow>
                    <TableCell>Project ID</TableCell>
                    <TableCell align="right">Project Description</TableCell>
                    <TableCell align="right">Project Funds</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>Example Project ID</TableCell>
                    <TableCell align="right">Example Project Description</TableCell>
                    <TableCell align="right">Example Project Funds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Example Project ID</TableCell>
                    <TableCell align="right">Example Project Description</TableCell>
                    <TableCell align="right">Example Project Funds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Example Project ID</TableCell>
                    <TableCell align="right">Example Project Description</TableCell>
                    <TableCell align="right">Example Project Funds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Example Project ID</TableCell>
                    <TableCell align="right">Example Project Description</TableCell>
                    <TableCell align="right">Example Project Funds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Example Project ID</TableCell>
                    <TableCell align="right">Example Project Description</TableCell>
                    <TableCell align="right">Example Project Funds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Example Project ID</TableCell>
                    <TableCell align="right">Example Project Description</TableCell>
                    <TableCell align="right">Example Project Funds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Example Project ID</TableCell>
                    <TableCell align="right">Example Project Description</TableCell>
                    <TableCell align="right">Example Project Funds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Example Project ID</TableCell>
                    <TableCell align="right">Example Project Description</TableCell>
                    <TableCell align="right">Example Project Funds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Example Project ID</TableCell>
                    <TableCell align="right">Example Project Description</TableCell>
                    <TableCell align="right">Example Project Funds</TableCell>
                  </TableRow>
                </TableBody>

              </Table>
            </TableContainer>
          </Table>
        </Grid>

      </Grid>
    </Container >
  );
}
