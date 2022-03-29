import React from 'react'
import { Button, AppBar, Toolbar, Typography, Drawer, makeStyles, List, ListItem, ListItemIcon, ListItemText, Container } from '@material-ui/core';
import { SubjectOutlined } from '@material-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => {

    return {

        page:
        {
            width: `100%`,
            padding: theme.spacing(3)
        },

        drawer:
        {
            width: drawerWidth,
        },

        drawerPaper:
        {
            width: drawerWidth,
        },

        root:
        {
            display: "flex",
        },

        active:
        {
            background: '#f4f4f4',
        },

        navbar:
        {
            width: `calc(100% - ${drawerWidth}px)`,
        },

        toolbar: theme.mixins.toolbar,

        date:
        {
            flexGrow: 1
        },

        title:
        {
            padding: theme.spacing(2)
        }
    }

})



export default function Layout({ children }) {

    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        {
            text: 'Home',
            icon: <SubjectOutlined color='secondary' />,
            path: '/',
        },

        {
            text: 'Projects',
            icon: <SubjectOutlined color='secondary' />,
            path: '/Projects',
        },

        {
            text: 'Datasets',
            icon: <SubjectOutlined color='secondary' />,
            path: '/Datasets',
        },

    ]

    return (
        <div className={classes.root}>

            {/* Permanent Drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor='left'
                classes={{ paper: classes.drawerPaper }}>
                <Typography
                    variant='h5'
                    color='primarytext'
                    className={classes.title}>
                    Banger Project
                </Typography>

                <List>
                    {menuItems.map(item => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            className={location.pathname === item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}

                </List>
            </Drawer >


            {/* App Bar */}
            < AppBar
                className={classes.navbar}
                elevation={0} >
                <Toolbar>
                    <Typography
                        variant='h5'
                        className={classes.date}
                    >
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>

                    <Button component={Link} to="/LogIn" variant='outlined' size='Large'>Sign In</Button>

                </Toolbar>
            </AppBar >

            {/* Our App Module (Pages) */}
            < div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div >
        </div >
    );
}