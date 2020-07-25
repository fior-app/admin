import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../context/Auth'
import { signInWithEmail } from '../api/Fior';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    maxWidth: 320,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  error: {
    color: 'red',
  },
  pos: {
    marginBottom: 12,
  },
});

export function Login() {
  const classes = useStyles();

  const [auth, setAuth] = useAuth()

  const [state, setState] = useState({ isSigningIn: false, error: null })

  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    setState((state) => ({ ...state, isSigningIn: true }))
    signInWithEmail(data.email, data.password).then((res) => {
      setState((state) => ({ ...state, isSigningIn: false }))
      if (res.data.token) {
        localStorage.setItem("token", res.data.token)
        setAuth((state) => ({ ...state, token: res.data.token }))
      }
    }).catch((err) => {
      let error;
      if (err && err.response && err.response.data && err.response.data.message) {
        error = err.response.data.message
      } else {
        error = "Unknown error"
      }
      setState((state) => ({ ...state, isSigningIn: false, error }))
    })
  }

  if (!auth.loading && auth.token) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">Login</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" name="email" ref={register({ require: true })} />
            <input type="password" name="password" ref={register({ required: true })} />
            {state.error && <div className={classes.error}>{state.error}</div>}
            <Button variant="contained" color="primary" type="submit" disabled={state.isSigningIn}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}