import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  TextField, Button, InputAdornment, Typography, makeStyles, Box, Container, Card, CardContent, Grid, FormControl, InputLabel,
  Select, MenuItem
} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import { VpnKeyRounded } from '@material-ui/icons';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';


const useStyles = makeStyles({

  idField: {
    marginBottom: 10,
    marginTop: 20,
    display: 'block',
  },

  idJoinField: {
    marginBottom: 30,
    marginTop: 20,
    display: 'block',
  },

  descField: {
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

  projectID: {
    marginLeft: 20,
    marginTop: 70,
  },

  projectDesc: {
    marginLeft: 20,
    marginTop: 10,
    // marginBottom: 220,
  },

  checkInOutInputs: {
    marginLeft: 100,
    marginBottom: 20,
  },

  hwset1: {
    marginLeft: 20,
    marginTop: 10,
  },

  hwset2: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 150
  }

})

const cardStyle = {
    height: "40.18vw"
};

export default function Projects(user) {

  const classes = useStyles()

  // Create Project States
  const [projectIDCreate, setProjectIDCreate] = useState('')
  const [projectIDCreateError, setProjectIDCreateError] = useState(false)
  const [projectDescription, setProjectDescription] = useState('')
  const [projectDescriptionError, setProjectDescriptionError] = useState(false)

  // Join Project States
  const [projectIDJoin, setProjectIDJoin] = useState('')
  const [projectIDJoinError, setProjectIDJoinError] = useState(false)

  // Display Current Project States
  const [currentProjectID, setCurrentProjectID] = useState('')
  const [currentProjectDescription, setCurrentProjectDescription] = useState('')

  // Check in / Check out States
  const [checkInOut, setCheckInOut] = useState("")
  const [hwset, setHwset] = useState("")
  const [qty, setQty] = useState("")
  const [checkInOutError, setCheckInOutError] = useState(false)
  const [hwsetError, setHwsetError] = useState(false)
  const [qtyError, setQtyError] = useState(false)

  // HardWare Set States
  const[hwset1, setHwSet1] = useState("")
  const[hwset2, setHwSet2] = useState("")


  //-------------------------------------------------------------------------------------------------------------------------------------------------  

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
        body: JSON.stringify({ "projectID": projectIDCreate, "projectDescription": projectDescription, "user": user, "project_type": "create" })
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
          } else if (data.output === "project invalid") {
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
          
          console.log(data.output["projectDescription"])

          setCurrentProjectID(data.output["projectID"]) 
          setCurrentProjectDescription(data.output["projectDescription"])
          setHwSet1(data.output["hwset1"])
          setHwSet2(data.output["hwset2"])
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

  const handleSubmitCheckInOut = (event) => {
    event.preventDefault();

    setCheckInOutError(false)
    setHwsetError(false)
    setQtyError(false)

    if (currentProjectID === '') {
      toast("Please specify project!")
      return
    }

    if (checkInOut === '') {
      setCheckInOutError(true)
    }

    if (hwset === '') {
      setHwsetError(true)
    }

    if (qty === '') {
      setQtyError(true)
    }

    if (checkInOut && hwset && qty) {

      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "projectID": currentProjectID, "checkInOut": checkInOut, "hwset": hwset, "qty": qty })
      }

      fetch("/check-in-out/", requestOptions)
        .then(response =>
          response.json()
        )
        .then(data => {

          // Error processing check in
          if (data.output === "Check In Error") {
            toast("Error processing Check In")
          }

          // Error processing check out
          else if (data.output === "Check Out Error") {
            toast("Error processing Check Out")
          }

          // No errors
          else {
            toast("Great Success")
            setHwSet1(data.output["hwset1"])
            setHwSet2(data.output["hwset2"])
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





  //---------------------------------------------------------------------------------------------------------------------------------------------------

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
                      className={classes.idField}
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
                      className={classes.descField}
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
                  Join/Access a Project
                </Typography>

                <form noValidate autoComplete='off' onSubmit={handleSubmitJoin}>
                  <Box id="projectID-input">
                    <TextField
                      className={classes.idJoinField}
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
          <Card elevation={2} style={cardStyle}>
            <Typography variant='h4' className={classes.projectID}>
              Project ID: {currentProjectID}
            </Typography>
            <Typography variant='h5' className={classes.projectDesc}>
              Description: {currentProjectDescription}
            </Typography>
            <Typography variant='h5' className={classes.hwset1}>
              Units Checked Out From HWSET1: {hwset1}
            </Typography>
            <Typography variant='h5' className={classes.hwset2}>
              Units Checked Out From HWSET2: {hwset2}
            </Typography>


            <form noValidate autoComplete='off' onSubmit={handleSubmitCheckInOut}>

              <Grid container className={classes.checkInOutInputs}>
                <Box px={3}>
                  <FormControl style={{minWidth: 150}} variant="outlined">
                    <InputLabel id="Check-In/Out-DropDown">Check In/Out</InputLabel>
                    <Select
                      labelId="Check-In/Out"
                      id="Check-In/Out"
                      value={checkInOut}
                      label="Select Action"
                      onChange={
                        (e) => setCheckInOut(e.target.value)
                      }
                      error={checkInOutError}
                    >
                      <MenuItem value={"In"}>Check-In</MenuItem>
                      <MenuItem value={"Out"}>Check-Out</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box px={3}>
                  <FormControl style={{minWidth: 150}} variant="outlined">
                    <InputLabel id="hwset">HWSet</InputLabel>
                    <Select
                      labelId="hwsetLabel"
                      id="hwsetID"
                      value={hwset}
                      label="Select Action"
                      onChange={
                        (e) => setHwset(e.target.value)
                      }
                      error={hwsetError}
                    >
                      <MenuItem value={1}>HWSet-1</MenuItem>
                      <MenuItem value={2}>HWSet-2</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box id="projectID-input" px={3}>
                  <TextField
                    className={classes.qtyField}
                    label="Qty"
                    color="secondary"
                    variant="outlined"
                    onChange={
                      (e) => setQty(e.target.value)
                    }
                    InputLabelProps={{
                      style: { fontSize: 22 }
                    }}
                    style = {{width: 150}}
                    error={qtyError}
                  />
                </Box>
              </Grid>

              <Box id="login-button/projects" px={10}>
                <Button
                  id="Check in/out"
                  className={classes.button}
                  variant="contained"
                  type="submit"
                  endIcon={<ArrowRightRoundedIcon fontSize='large' />}
                  style={{ fontSize: 18, maxHeight: 30 }}
                >
                  Submit
                </Button>
              </Box>
            </form>

          </Card>
        </Grid>

      </Grid>
    </Container >
  );
}
