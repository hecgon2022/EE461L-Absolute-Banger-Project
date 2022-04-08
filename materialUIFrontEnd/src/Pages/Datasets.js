import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Card, CardHeader, CardContent, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Collapse } from '@material-ui/core'
import { CardActions } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
  washImage: {
    height: '55%',
    width: '40%',
    marginLeft: '30%'
  },
  cagImage: {
    height: '47%',
    width: '32%',
    marginLeft: '36%'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function Datasets() {
  const classes = useStyles()

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const on1Download = () => {
    const link = document.createElement("a");
    link.download = `data1.zip`;
    link.href = "https://physionet.org/static/published-projects/physiozoo/physiozoo-mammalian-nsr-databases-1.0.0.zip";
    link.click();
  };

  const on2Download = () => {
    const link = document.createElement("a");
    link.download = `data1.zip`;
    link.href = "https://physionet.org/static/published-projects/cerebral-vasoreg-diabetes/cerebral-vasoregulation-in-diabetes-1.0.0.zip";
    link.click();
  };

  const on4Download = () => {
    const link = document.createElement("a");
    link.download = `data1.zip`;
    link.href = "https://physionet.org/static/published-projects/unicaprop/unica-electrotastegram-database-prop-1.0.0.zip";
    link.click();
  };

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
            <Typography variant="h6" color="textSecondary">
              The PhysioZoo database contains electrocardiographic recordings (ECG) 
              taken from multiple types of mammals (dogs, rabbits, mice). Each record is 
              provided in 3 different formats: MATLAB (.mat), simple text (.txt), PhysioNet 
              (.hea,.dat,.qrs). For each record the following data is available: the raw ECG signal, reference 
              (human corrected) R-peak annotations and the signal quality annotations. All of the files formats 
              are compatible with the PhysioZoo open source software available at physiozoo.com. When the recordings were 
              taken, all the mammals were conscious, and no drugs were administered prior to the recordings.
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h1">
                Metadata 1
              </Typography>
              
              <Button onClick={on1Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card elevation={2}>
        <CardHeader 
            title="Cerebral Vasoregulation In Diabetes Database"
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

          <CardActions>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h1">
                Metadata 2
              </Typography>
              
              <Button onClick={on2Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card elevation={2}>
        <CardHeader 
            title="Wide-Field Calcium Imaging Sleep State Database"
            subheader="Published Mar. 17, 2022"
          />

          <CardMedia
            className={classes.washImage} 
            component="img"
            image={require('../Images/washington-logo.png')}
          />

          <CardContent>
            <Typography variant="h6" color="textSecondary" >
            A collection of wide-field calcium imaging (WFCI) sleep and wake recordings collected from twelve 
            transgenic mice expressing GCaMP6f in excitatory neurons. Each mouse underwent a three-hour 
            undisturbed WFCI recording session where wake, REM (rapid eye movement) sleep and NREM (non-REM) 
            sleep was recorded. Each WFCI recording is manually scored by sleep scoring experts in 10-second 
            epochs as wake, NREM or REM by use of adjunct EEG/EMG. The dataset contains annotated WFCI recordings, 
            brain mask and the Paxinos atlas used for defining the brain regions. The dataset was collected as 
            part of a study evaluating a deep learning-based automated sleep state classification method.
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h1">
                Metadata 3
              </Typography>
              
              <Button onClick={on2Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card elevation={2}>
        <CardHeader 
            title="UniCA ElectroTastegram Database (PROP)"
            subheader="Published Jul. 19, 2017"
          />

          <CardMedia
            className={classes.cagImage} 
            component="img"
            image={require('../Images/cag-logo.jpg')}
          />

          <CardContent>
            <Typography variant="h6" color="textSecondary" >
            The UniCA ElectroTastegram Database (PROP) contains 39 differential biopotential measurements 
            recorded from the tongues of as many healthy voluntary human subjects (16 males, 23 females, 
            equally divided into the three PROP taster status classes), during a stimulation with 30uL, 3.2 
            mmol/L solution of 6-n-propylthiouracil (PROP).
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h1">
                Metadata 4
              </Typography>
              
              <Button onClick={on4Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card elevation={2}>
        <CardHeader 
            title="CHB-MIT Scalp EEG Database"
            subheader="Published Jun. 9, 2010"
          />

          <CardMedia
            className={classes.cagImage} 
            component="img"
            image={require('../Images/mit-logo.png')}
          />

          <CardContent>
            <Typography variant="h6" color="textSecondary" >
              This database, collected at the Children’s Hospital Boston, consists of EEG recordings from 
              pediatric subjects with intractable seizures. Subjects were monitored for up to several days 
              following withdrawal of anti-seizure medication in order to characterize their seizures and 
              assess their candidacy for surgical intervention.
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h1">
                Metadata 3
              </Typography>
              
              <Button onClick={on4Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card elevation={2}>
        <CardHeader 
            title="BIDMC Congestive Heart Failure Database"
            subheader="Published Oct. 14, 2000"
          />

          <CardMedia
            className={classes.bethImage} 
            component="img"
            image={require('../Images/beth-logo.png')}
          />

          <CardContent>
            <Typography variant="h6" color="textSecondary" >
            This database includes long-term ECG recordings from 15 subjects (11 men, aged 22 to 71, and 
            4 women, aged 54 to 63) with severe congestive heart failure (NYHA class 3–4). This group of 
            subjects was part of a larger study group receiving conventional medical therapy prior to receiving 
            the oral inotropic agent, milrinone. Further details about the larger study group are available 
            in the first reference cited above. A number of additional studies have made use of these recordings; 
            see the additional references below. The individual recordings are each about 20 hours in duration, 
            and contain two ECG signals each sampled at 250 samples per second with 12-bit resolution over a range 
            of ±10 millivolts. The original analog recordings were made at Boston's Beth Israel Hospital (now the 
            Beth Israel Deaconess Medical Center) using ambulatory ECG recorders with a typical recording bandwidth 
            of approximately 0.1 Hz to 40 Hz. Annotation files (with the suffix .ecg) were prepared using an automated 
            detector and have not been corrected manually.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}