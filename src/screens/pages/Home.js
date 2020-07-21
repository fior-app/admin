import React, { useContext } from 'react'
import { useForm } from "react-hook-form";

import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';

export function Login() {
  const [, setAuthState] = useContext(AuthContext)

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" name="email" ref={register({ require: true })} />
      <input type="password" name="password" ref={register({ required: true })} />
      <input type="submit" value="Login" />
    </form>
  );
}