import React, { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import axios from 'axios';

interface LoginProps {}

export default function Login (props: LoginProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (isAuthenticated)  {
    return <Navigate to="/projects" />;
  }

  async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth',{login, password}, {
        auth : { username: login, password: password },
        headers: {"Access-Control-Allow-Headers": "Content-Type, Authorization", 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
      });

      // If authentication is successful, the backend should return a JWT token
      const token = response.data.token;

      // Set the token in localStorage to persist it across pages
      localStorage.setItem('token', token);

      // Redirect the user to the homepage
      location.href = '/projects';
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  }

  return (
    <Card>
      <div style={ { textAlign : 'center' } }>
        <h1 style={ { margin: '1em' } }>Login</h1>

        <form method= "POST" onSubmit={handleSubmit}>
          <div className="form">
            <h3>Login: </h3>
            <input name="login" type="text" onChange={(event) => setLogin(event.target.value)} />
            <h3>Password: </h3>
            <input autoComplete="suggested" name="password" type="password" onChange={(event) => setPassword(event.target.value)} />
          </div>
          <div className="gridone"><Button type="submit" >Sign in</Button></div>
        </form>
      </div>
    </Card>
  );
};