import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from '@material-ui/core/colors/green';

import './App.css';
import { AuthProvider, AuthContext } from "./context/Auth";
import { Dashboard } from './screens/Dashboard';
import { Login } from './screens/Login';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <AppRoute></AppRoute>
    </AuthProvider>
  );
}

function AppRoute() {
  const [auth, setAuth] = useContext(AuthContext)

  // Effects
  useEffect(() => {
    const token = localStorage.getItem("token")

    setAuth((state) => ({ ...state, loading: false, token: token }))
  }, [setAuth])

  return (

    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          {auth.loading || auth.token ? <Route path="/" component={Dashboard} /> : <Redirect to="/login" />}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
