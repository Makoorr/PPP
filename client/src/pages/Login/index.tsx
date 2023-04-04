import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import './style.css'
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';

interface LoginProps {}

export default function Login (props: LoginProps) {
  let navigate = useNavigate();
  let location = useLocation();
  //   let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;

    //  auth.signin(username, () => {
    //    // Send them back to the page they tried to visit when they were
    //    // redirected to the login page. Use { replace: true } so we don't create
    //    // another entry in the history stack for the login page.  This means that
    //    // when they get to the protected page and click the back button, they
    //    // won't end up back on the login page, which is also really nice for the
    //    // user experience.
    //    navigate(from, { replace: true });
    //  });
  }

  return (
    <div>
      <Card bgColor="#ff4747" color="#fff">
        <h3>Login</h3>

        <form onSubmit={handleSubmit} className="form">
          <h5>Username: </h5>
          <input name="username" type="text" />
          <h5>Password: </h5>
          <input name="password" type="password" />
          <Button>Register</Button>
          <Button type="submit" >Login</Button>
        </form>
      </Card>
    </div>
  );
};