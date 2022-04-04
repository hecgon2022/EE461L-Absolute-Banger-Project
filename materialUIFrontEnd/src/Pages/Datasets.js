import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Card, CardHeader, CardContent, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  pzImage: {
    height: '50%',
    width: '33%',
    marginLeft: '33%'
  },
  bethImage: {
    height: '42%',
    width: '27%',
    marginLeft: '39%'
  },
})

export default function Datasets() {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Card elevation={2}>
          <CardHeader 
            title="PhysioZoo - Mammalian NSR Databases"
            subheader="Published Aug. 27, 2019"
          />

          <CardMedia
            className={classes.pzImage} 
            component="img"
            image={require('../Images/pz-logo.png')}
          />

          <CardContent>
            <Typography variant="h6" color="textSecondary" >
              The PhysioZoo database contains electrocardiographic recordings (ECG) 
              taken from multiple types of mammals (dogs, rabbits, mice). Each record is 
              provided in 3 different formats: MATLAB (.mat), simple text (.txt), PhysioNet 
              (.hea,.dat,.qrs). For each record the following data is available: the raw ECG signal, reference 
              (human corrected) R-peak annotations and the signal quality annotations. All of the files formats 
              are compatible with the PhysioZoo open source software available at physiozoo.com. When the recordings were 
              taken, all the mammals were conscious, and no drugs were administered prior to the recordings.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card elevation={2}>
        <CardHeader 
            title="Cerebral Vasoregulation In Diabetes"
            subheader="Published Jan. 30, 2020"
          />

          <CardMedia
            className={classes.bethImage} 
            component="img"
            image={require('../Images/beth-logo.png')}
          />

          <CardContent>
            <Typography variant="h6" color="textSecondary" >
              This observational study evaluated the effects of type 2 diabetes on cerebral 
              vasoregulation and functional outcomes, measured by blood flow responses to hypocapnia 
              and hypercapnia, Valsalva maneuver, head-up tilt, and sit-to-stand test. This dataset 
              contains 37 diabetic participants and 49 controls (aged  55 to 75 years) with continuous 
              measurements of cerebral blood flow using transcranial Doppler and MRI, heart rate, blood 
              pressure, and respiratory parameters, balance, walking, laboratory and retinopathy measures.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card elevation={2}>
          3
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card elevation={2}>
          4
        </Card>
      </Grid>
    </Grid>
  );
}