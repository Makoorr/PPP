import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';

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
    <Card>
      <div style={ { textAlign : 'center' } }>
        <h1 style={ { margin: '1em' } }>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form">
            <h3>Username: </h3>
            <input name="username" type="text" />
            <h3>Password: </h3>
            <input autoComplete="suggested" name="password" type="password" />
          </div>
          <div className="gridone"><Button type="submit" >Sign in</Button></div>
        </form>
      </div>
    </Card>
  );
};