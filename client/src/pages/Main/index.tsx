import React, { FC } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

interface MainProps {}

export default function Main({}: MainProps) {

  function AuthStatus() {
    // let auth = useAuth();
    // let navigate = useNavigate();
  
    // if (!auth.user) {
    //   return <p>You are not logged in.</p>;
    // }
  
    return (
      <p>
        {/* Welcome {auth.user}!{" "}
        <button
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
        >
          Sign out
        </button> */}
      </p>
    );
  }

  return (
      <div>
         <AuthStatus />

         {/* <ul>
         <li>
            <Link to="/login">Public Page</Link>
         </li>
         <li>
            <Link to="/register">Protected Page</Link>
         </li>
         </ul> */}

         <Outlet />
      </div>
  );
}