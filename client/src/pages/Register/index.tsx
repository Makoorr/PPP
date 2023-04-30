import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import axios from '../../axiosConfig';

interface RegisterProps {}

export default function Register (props: RegisterProps) {
  let navigate = useNavigate();
  let location = useLocation();
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (isAuthenticated)  {
    return <Navigate to="/projects" />;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    const name = formData.get("username") as string;
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;

    axios
      .post("/auth/register", {
        name: name,
        login: login,
        password: password,
      })
      .then(function () {
        navigate("/login");
      })
      .catch(function (error: any) {
        alert(error);
      });
  }

  return (
    <Card>
      <div style={ { textAlign : 'center' } }>
        <h1 style={ { margin: '1em' } }>Registration</h1>

        <form onSubmit={handleSubmit}>
          <div className="form">
            <h3>Login: </h3>
            <input name="login" type="text" />
            <h3>Username: </h3>
            <input name="username" type="text" />
            <h3>Password: </h3>
            <input autoComplete="suggested" name="password" type="password" />
          </div>
          <div className="gridone"><Button type="submit" >Sign up</Button></div>
        </form>
      </div>
    </Card>
  );
};