import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined'
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded'

const useStyles = makeStyles({
    field: {
      marginTop: 20, 
      marginBottom: 20,
      display: 'block',
    }
  })

export default function Login() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
  
    const handleSubmit = (e) => {
      e.preventDefault()
  
      setEmailError(false)
      setPasswordError(false)
  
      if (email == ''){
        setEmailError(true)
      }
  
      if (password == ''){
        setPasswordError(true)
      }
  
      if (email && password){
        console.log(email, password)
      }
    }

  return (
    <Container>
        <Typography
            variant="h6"
            color="textSecondary"
            component="h2"
            gutterBottom
        >
            Login
        </Typography>

        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField 

                onChange={(e) => setEmail(e.target.value)}
                className={classes.field}
                label="Enter Email" 
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={emailError}
            />   

            <TextField 
                onChange={(e) => setPassword(e.target.value)}
                className={classes.field}
                label="Enter Password" 
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={passwordError}
            />

            <Button
                //onClick={() => console.log("Nogga Brossed")} 
                type="submit" color="secondary" 
                variant="contained" 
                endIcon={<ArrowRightOutlinedIcon/>}
            >
                Submit
            </Button>
        </form>
    </Container>
  )
}
