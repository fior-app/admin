import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';

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
  pos: {
    marginBottom: 12,
  },
});

export function Login() {
  const classes = useStyles();

  const [, setAuthState] = useContext(AuthContext)

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data)
    axios.post('http://localhost:8080/auth/signin/email', {
      email: data.email,
      password: data.password,
    }).then((res) => {
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token)
        setAuthState(state => ({ ...state, token: res.data.token }))
      }
    })
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">Login</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" name="email" ref={register({ require: true })} />
            <input type="password" name="password" ref={register({ required: true })} />
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}