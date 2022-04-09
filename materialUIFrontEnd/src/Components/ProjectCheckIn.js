import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, InputAdornment, Typography, makeStyles, Box, Container, Card, CardContent, Grid, Paper } from "@material-ui/core";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import {CardHeader} from "@material-ui/core/CardHeader";


export default function ProjectCheckIn(){
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




    return(
        <Container>
            <Grid container spacing={1} className={classes.grid}>
                <Typography>
                    ProjectID: 
                </Typography>
            </Grid>
        </Container>
    );
    
}