import React, { useState } from 'react'
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

  const [expanded1, setExpanded1] = useState(false);
  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };

  const [expanded2, setExpanded2] = useState(false);
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };

  const [expanded3, setExpanded3] = useState(false);
  const handleExpandClick3 = () => {
    setExpanded3(!expanded3);
  };

  const [expanded4, setExpanded4] = useState(false);
  const handleExpandClick4 = () => {
    setExpanded4(!expanded4);
  };

  const [expanded5, setExpanded5] = useState(false);
  const handleExpandClick5 = () => {
    setExpanded5(!expanded5);
  };

  const [expanded6, setExpanded6] = useState(false);
  const handleExpandClick6 = () => {
    setExpanded6(!expanded6);
  };

  const [metaDesc1, setMetaDesc1] = useState('');
  const [metaDesc2, setMetaDesc2] = useState('');
  const [metaDesc3, setMetaDesc3] = useState('');
  const [metaDesc4, setMetaDesc4] = useState('');
  const [metaDesc5, setMetaDesc5] = useState('');
  const [metaDesc6, setMetaDesc6] = useState('');

  

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

  const on3Download = () => {
    const link = document.createElement("a");
    link.download = `data1.zip`;
    link.href = "https://physionet.org/static/published-projects/bpssrat/blood-pressure-in-salt-sensitive-dahl-rats-1.0.0.zip";
    link.click();
  };

  const on4Download = () => {
    const link = document.createElement("a");
    link.download = `data1.zip`;
    link.href = "https://physionet.org/static/published-projects/unicaprop/unica-electrotastegram-database-prop-1.0.0.zip";
    link.click();
  };

  const on5Download = () => {
    const link = document.createElement("a");
    link.download = `data1.zip`;
    link.href = "https://physionet.org/static/published-projects/chbmit/chb-mit-scalp-eeg-database-1.0.0.zip";
    link.click();
  };

  const on6Download = () => {
    const link = document.createElement("a");
    link.download = `data1.zip`;
    link.href = "https://physionet.org/static/published-projects/chfdb/bidmc-congestive-heart-failure-database-1.0.0.zip";
    link.click();
  };

  const handleMetadata = () => {

      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "url1": "https://physionet.org/content/physiozoo/1.0.0/", "url2": "https://physionet.org/content/cerebral-vasoreg-diabetes/1.0.0/", 
          "url3": "https://physionet.org/content/bpssrat/1.0.0/", "url4": "https://physionet.org/content/unicaprop/1.0.0/", 
          "url5": "https://physionet.org/content/chbmit/1.0.0/", "url6": "https://physionet.org/content/chfdb/1.0.0/" })
      }

      fetch("/metadata/", requestOptions)
        .then(response =>
          response.json()
        )
        .then(data => {
          
          console.log(data.output)
          setMetaDesc1(data.output['url1'])
          setMetaDesc2(data.output['url2'])
          setMetaDesc3(data.output['url3'])
          setMetaDesc4(data.output['url4'])
          setMetaDesc5(data.output['url5'])
          setMetaDesc6(data.output['url6'])
        })

        .catch(error => {
          console.log(error)
        })

      //we have to then return the profile depending on the log in information here.
      //this is the end of the if statement
    
  }

  return (

    <>
    <Button
      id="login"
      className={classes.button}
      variant="contained"
      style={{ fontSize: 18, maxHeight: 30 }}
      onClick={handleMetadata}
    >
      Show Metadata
    </Button>

    <Grid container spacing={3}>
      <Grid item xs={6} id="1">
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
              className={clsx(classes.expand1, {
                [classes.expandOpen]: expanded1,
              })}
              onClick={handleExpandClick1}
              aria-expanded={expanded1}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded1} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                {metaDesc1}
              </Typography>
              
              <Button onClick={on1Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={6} id="2">
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
              className={clsx(classes.expand2, {
                [classes.expandOpen]: expanded2,
              })}
              onClick={handleExpandClick2}
              aria-expanded={expanded2}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded2} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                {metaDesc2}
              </Typography>
              
              <Button onClick={on2Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={6} id="3">
        <Card elevation={2}>
        <CardHeader 
              title="Blood Pressure in Salt-Sensitive Dahl Rats"
              subheader="Published June 26, 2012"
          />

          <CardMedia
            className={classes.washImage} 
            component="img"
            image={require('../Images/washington-logo.png')}
          />

          <CardContent>
            <Typography variant="h6" color="textSecondary" >
            Salt-sensitive hypertension is known to be associated with dysfunction of the baroreflex control system in the Dahl salt-sensitive (SS) rat. However, neither the physiological mechanisms nor the genomic regions underlying the baroreflex dysfunction seen in this rat model are definitively known. Here, we have adopted a mathematical modeling approach to investigate the physiological and genetic origins of baroreflex dysfunction in the Dahl SS rat. We have developed a computational model of the overall baroreflex heart rate control system based on known physiological mechanisms to analyze telemetry-based blood pressure and heart rate data from two genetic strains of rat, the SS and consomic SS.13BN, on low- and high-salt diets. With this approach, physiological parameters are estimated, unmeasured physiological variables related to the baroreflex control system are predicted, and differences in these quantities between the two strains of rat on low- and high-salt diets are detected. Specific findings include: a significant selective impairment in sympathetic gain with high-salt diet in SS rats and a protection from this impairment in SS.13BN rats, elevated sympathetic and parasympathetic offsets with high-salt diet in both strains, and an elevated sympathetic tone with high-salt diet in SS but not SS.13BN rats. In conclusion, we have associated several important physiological parameters of the baroreflex control system with chromosome 13 and have begun to identify possible physiological mechanisms underlying baroreflex impairment and hypertension in the Dahl SS rat that may be further explored in future experimental and modeling-based investigation.
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton
              className={clsx(classes.expand3, {
                [classes.expandOpen]: expanded3,
              })}
              onClick={handleExpandClick3}
              aria-expanded={expanded3}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded3} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                {metaDesc3}
              </Typography>
              
              <Button onClick={on3Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={6} id="4">
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
              className={clsx(classes.expand4, {
                [classes.expandOpen]: expanded4,
              })}
              onClick={handleExpandClick4}
              aria-expanded={expanded4}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded4} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                {metaDesc4}
              </Typography>
              
              <Button onClick={on4Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={6} id="5">
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
              className={clsx(classes.expand5, {
                [classes.expandOpen]: expanded5,
              })}
              onClick={handleExpandClick5}
              aria-expanded={expanded5}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded5} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                {metaDesc5}
              </Typography>
              
              <Button onClick={on5Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Grid item xs={6} id="6">
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

          <CardActions>
            <IconButton
              className={clsx(classes.expand6, {
                [classes.expandOpen]: expanded6,
              })}
              onClick={handleExpandClick6}
              aria-expanded={expanded6}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded6} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                {metaDesc6}
              </Typography>
              
              <Button onClick={on6Download} variant="contained">
                Download Link
              </Button>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </Grid>
    </>
  );
}