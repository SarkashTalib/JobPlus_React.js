import { AppBar, Badge, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import React from 'react'

import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';

import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.container
  },
  iconsWrap: {
    marginLeft: 'auto',
    '& .MuiButtonBase-root': {
      marginLeft: '13px'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '25px'
    }
  },
  tabs: {
    '& .MuiTab-root': {
      minWidth: 10,
      marginLeft: '10px'
    }
  },
  hamburger: {
    fontSize: '35px',
    marginRight: '10px'
  },
  logo: {
    ...theme.fonts.bold,
    fontSize: '20px'
  },
  badge: {
    backgroundColor: theme.palette.error.main,
    border: '1px white solid'
  },
  indicator: {
    backgroundColor: theme.palette.common.light,
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // Was necessary for the content to be below appbar
    ...theme.mixins.toolbar,
  }
}));

export default function Navbar() {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const [tabIndex, setTabIndex] = useState(false);

  const handleTabIndexChange = (event, index) => {
    setTabIndex(index);
  }

  const routes = [
    { name: 'Home', link: '/', index: 0 },
    { name: 'Job Listings', link: '/job-listings', index: 1 },
    { name: 'Job Applications', link: '/job-applications', index: 2 },
  ]
  // it takes care of setting active li nk when refreshed
  useEffect(() => {
      routes.forEach(route => {
        switch (window.location.pathname) {
          case `${route.link}`:
            setTabIndex(route.index);
            break;
          default:
            return false;
        }
      })
    }, 
    // eslint-disable-next-line
    [window.location.pathname]
  )

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className={classes.container}>
          <Hidden mdUp>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={handleDrawerOpen}
            >
              <MenuIcon className={classes.hamburger} />
            </IconButton>
          </Hidden>
          <Typography component="h6" className={classes.logo}>JOBPLUS</Typography>
          <Hidden smDown>
            <Tabs
              value={tabIndex}
              className={classes.tabs}
              classes={{ indicator: classes.indicator }}
              onChange={handleTabIndexChange}
            >
              {routes.map((route, index) => (
                <Tab
                  key={`${route}${index}`}
                  label={route.name}
                  component={Link}
                  to={route.link}
                />
              ))}


            </Tabs>
          </Hidden>
          <Box className={classes.iconsWrap}>
            <IconButton size="small" component={Link} to={'/search'} color='inherit' edge='start'>
              <SearchIcon />
            </IconButton>

            <IconButton size="small" component={Link} to={'/notifications'} color='inherit' edge='start'>
              <Badge color="error" overlap="circular" variant="dot">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>

            <IconButton size="small" component={Link} to={'/saved-jobs'} color='inherit' edge='start'>
              <Badge badgeContent={2} classes={{ badge: classes.badge }}>
                <StarBorderIcon />
              </Badge>
            </IconButton>

            <IconButton size="small" component={Link} to={'/profile'} color='inherit' edge='start'>
              <PersonOutlineIcon />
            </IconButton>

            <IconButton size="small" component={Link} to={'/login'} color='inherit' edge='start'>
              <ExitToAppIcon />
            </IconButton>

          </Box>

        </Toolbar>
      </AppBar>

      <Drawer variant="persistent" anchor="left" open={openDrawer}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {routes.map((route, index) => (
            <ListItem
              key={`${route}${index}`}
              component={Link}
              to={route.link}
              selected={window.location.pathname === route.link}
              onClick={handleDrawerClose}
              button>
              <ListItemText primary={route.name} />
            </ListItem>
          ))}

        </List>
      </Drawer>
    </Box>
  )
}
