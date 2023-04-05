import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import './style.css'
import Navbar from '../../components/Navbar';

interface RegisterProps {}

export default function Register (props: RegisterProps) {
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
   //    // redirected to the register page. Use { replace: true } so we don't create
   //    // another entry in the history stack for the register page.  This means that
   //    // when they get to the protected page and click the back button, they
   //    // won't end up back on the register page, which is also really nice for the
   //    // user experience.
   //    navigate(from, { replace: true });
   //  });
  }

  return (
    <div>
      <Navbar background="True" />
      
      <Card bgColor="#3465bc" color="#fff">
        <h3>Registration</h3>

        <form onSubmit={handleSubmit}>
          <div className="form">
            <h5>Login: </h5>
            <input name="login" type="text" />
            <h5>Username: </h5>
            <input name="username" type="text" />
            <h5>Password: </h5>
            <input name="password" type="password" />
          </div>
          <Button type="submit" >Sign up</Button>
        </form>
      </Card>
    </div>
  );
};