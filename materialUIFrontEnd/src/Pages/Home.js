import { Typography, makeStyles, Container, Box } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => {

  return {

    title: {
      textAlign: 'center',
      fontWeight: 500,
      paddingTop: 100,
    },

    description: {
      textAlign: 'center',
      fontWeight: 300,
      paddingTop: 75,
    },

    credits: {
      textAlign: 'center',
      paddingTop: 100,
    },

  }

})

export default function Home() {

  const classes = useStyles()


  return (
    <Container>
      <Typography
        variant='h2'
        className={classes.title}>
        Absolute Banger Project
      </Typography>

      <Container maxWidth='md'>
        <Typography
          variant='h4'
          className={classes.description}
        >
          This project is a Hardware as a Service (HaaS) Application that allows users to create projects,
          check out hardware sets for their related projects, and access a variety of publicly accessible datasets.
        </Typography>
      </Container>


      <Typography
        variant='h6'
        className={classes.credits}>
        Created by: Hector Gonzalez, John Do, Arya Amin, Kushal Vajrala, Seema Kulkarni, and Tanya Shiram.
      </Typography>

    </Container >
  );
}