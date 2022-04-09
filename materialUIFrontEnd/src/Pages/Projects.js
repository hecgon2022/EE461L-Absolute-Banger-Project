import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, InputAdornment, Typography, makeStyles, Box, Container, Card, CardContent, Grid, Paper } from "@material-ui/core";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import CardHeader from "@material-ui/core/CardHeader";
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import { VpnKeyRounded } from '@material-ui/icons';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';


const useStyles = makeStyles({

  userField: {
    marginBottom: 10,
    marginTop: 20,
    display: 'block',
  },

  userJoinField: {
    marginBottom: 30,
    marginTop: 20,
    display: 'block',
  },

  passwordField: {
    marginBottom: 30,
    display: 'block',
  },

  button: {
    borderRadius: 10,
    marginBottom: 50,
  },

  createForm: {
    maxHeight: 800,
  },

  grid: {
    marginTop: 20,
  },

  projectTable: {
    display: "block",
    maxHeight: 500,
  },

  titles: {
    display: "block",
  },

})

export default function Projects(user) {

  const classes = useStyles()
  const [projectIDCreate, setProjectIDCreate] = useState('')
  const [projectIDJoin, setProjectIDJoin] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectIDCreateError, setProjectIDCreateError] = useState(false)
  const [projectIDJoinError, setProjectIDJoinError] = useState(false)
  const [projectDescriptionError, setProjectDescriptionError] = useState(false)

  const [currentProjectID, setCurrentProjectID] = useState('')
  const [currentProjectDescription, setCurrentProjectDescription] = useState('')

 

  const handleSubmitCreate = (event) => {
    event.preventDefault();

    setProjectIDJoinError(false)
    setProjectDescriptionError(false)

    if (projectIDCreate === '') {
      setProjectIDCreateError(true)
    }

    if (projectDescription === '') {
      setProjectDescriptionError(true)
    }

    if (projectIDCreate && projectDescription && user.user !== "Guest") {

      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "projectID": projectIDCreate, "projectDescription": projectDescription, "user": user, "project_type": "create"})
      }

      fetch("/projects/", requestOptions)
        .then(response =>
          response.json()
        )
        .then(data => {
          // console.log(data.output)
          if (data.output === "new project") {
            // Update our user status
            setCurrentProjectID(projectIDCreate)
            setCurrentProjectDescription(projectDescription)
          } else if (data.output === "project invalid"){
            toast("project already exists")
          }
        })
        .catch(error => {
          console.log(error)
        })

      //we have to then return the profile depending on the log in information here.
      //this is the end of the if statement
    } else {
      toast("You must be logged in to create.")
    }
  }

  const handleSubmitJoin = (event) => {
    event.preventDefault();

    setProjectIDJoinError(false)

    if (projectIDJoin === '') {
      setProjectIDCreateError(true)
    }

    if (projectIDJoin && user.user !== "Guest") {
      console.log(user)
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "projectID": projectIDJoin, "projectDescription": projectDescription, "user": user, "project_type": "join" })
      }

      fetch("/projects/", requestOptions)
        .then(response =>
          response.json()
        )
        .then(data => {
          // console.log(data.output)
          if (data.output === "project exists") {
            // Update our user status
            setCurrentProjectID(projectIDJoin)
            setCurrentProjectDescription(projectDescription)

          } else {
            toast("Project doesn't exist. Create it first")
          }
        })
        .catch(error => {
          console.log(error)
        })

      //we have to then return the profile depending on the log in information here.
      //this is the end of the if statement
    } else {
      toast("You must be logged in to join.")
    }
  }

  return (

    <Container>
      <Grid container spacing={1} className={classes.grid}>

        <Grid item xs={6} md={4} className={classes.createForm}>
          <Box className={classes.createForm}>
            <Card elevation={1} className={classes.createForm}>

              <CardHeader>
                title={<div></div>}
              </CardHeader>

              <CardContent>

                <Typography
                  variant='h4'
                  classname={classes.titles}>
                  Create New Project
                </Typography>

                <form noValidate autoComplete='off' onSubmit={handleSubmitCreate}>
                  <Box id="projectID-input">
                    <TextField
                      className={classes.userField}
                      label="Project ID"
                      color="secondary"
                      onChange={
                        (e) => setProjectIDCreate(e.target.value)
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
                      error={projectIDCreateError}
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

                <Typography
                  variant='h4'
                  classname={classes.titles}>
                  Join a Project
                </Typography>

                <form noValidate autoComplete='off' onSubmit={handleSubmitJoin}>
                  <Box id="projectID-input">
                    <TextField
                      className={classes.userJoinField}
                      label="Project ID"
                      color="secondary"
                      onChange={
                        (e) => setProjectIDJoin(e.target.value)
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
                      error={projectIDJoinError}
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
                      Join
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Grid>


        <Grid item xs={6} md={8}>
          <Box>
            <Typography>
              Project ID: {currentProjectID}
            </Typography>
            <Typography>
              Project Description: {currentProjectDescription}
            </Typography>


          </Box>
        </Grid>

      </Grid>
    </Container >
  );
}
