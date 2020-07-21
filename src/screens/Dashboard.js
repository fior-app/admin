import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

import { AuthContext } from '../context/AuthContext'
import { Login } from "./pages/Login"

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export function Dashboard() {
  const classes = useStyles()

  // States
  const [user, setUser] = useState(null)

  // Contexts
  const [authState, setAuthState] = useContext(AuthContext)

  // Effects
  useEffect(() => {
    const token = localStorage.getItem("token")

    setAuthState(state => ({ ...state, token: token }))
  }, [setAuthState])

  useEffect(() => {
    if (authState && authState.token) {
      axios.get("http://localhost:8080/users/me", { headers: { Authorization: `Bearer ${authState.token}` } }).then((res) => {
        setUser(res.data)
      })
    }
  }, [authState])

  // Actions
  const logout = () => {
    localStorage.removeItem("token")
    setAuthState((state) => ({ ...state, token: null }))
  }

  if (!authState.token) {
    return (
      <Login if></Login>
    )
  } else {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>Dashboard</Typography>
            <div>{user && user.name}</div>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}>
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {['Home', 'Skills'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index === 0 ? <HomeIcon /> : <LocalLibraryIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Typography paragraph>
          </Typography>
        </main>
      </div>
    )
  }
}