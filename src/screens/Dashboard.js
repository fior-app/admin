import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PersonIcon from '@material-ui/icons/Person';

import { useAuth } from '../context/Auth'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { Home } from './pages/Home';
import { Skill } from './pages/Skill';
import { getMe } from '../api/Fior';
import { SkillDetail } from './pages/SkillDetail';
import { Admin } from './pages/Admin';

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
  isActive: {
    backgroundColor: '#00000016',
  },
}));

export function Dashboard() {
  const classes = useStyles()

  // States
  const [user, setUser] = useState(null)

  // Contexts
  const [auth, setAuth] = useAuth()

  useEffect(() => {
    if (!auth.loading && auth.token) {
      getMe(auth.token).then((res) => {
        setUser(res.data)
      })
    }
  }, [auth])

  // Actions
  const logout = () => {
    localStorage.removeItem("token")
    setAuth((state) => ({ ...state, token: null }))
  }

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
            {['Home', 'Skills', 'Admins'].map((text, index) => (
              <ListItem button component={NavLink} to={`/${text.toLowerCase()}`} activeClassName={classes.isActive} key={text} >
                <ListItemIcon>{index === 0 ? <HomeIcon /> : index === 1 ? <LocalLibraryIcon /> : <PersonIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/admins" exact component={Admin} />
          <Route path="/skills" exact component={Skill} />
          <Route path="/skills/:skillId" component={SkillDetail} />
          <Redirect path="/" exact to="/home" />
        </Switch>
      </main>
    </div>
  )
}