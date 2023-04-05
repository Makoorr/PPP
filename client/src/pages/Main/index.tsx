import React, { FC } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Wave from '../../components/Wave';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';

interface MainProps {}

export default function Main({}: MainProps) {

  function AuthStatus() {
    // let auth = useAuth();
    // let navigate = useNavigate();
  
    // if (!auth.user) {
    //   return <p>You are not logged in.</p>;
    // }
  
    return (
      <>
        {/* Welcome {auth.user}!{" "}
        <button
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
        >
          Sign out
        </button> */}
      </>
    );
  }

  return (
      <div>
         <AuthStatus />
         <Wave nav ={<Navbar />}
            left = {
              <>
                <h1>Task Management APP</h1>
                <h2>DevOps PPP Project</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi qui eos a incidunt blanditiis doloribus temporibus neque? Corporis ipsa odit accusantium fugit mollitia porro cupiditate? Deserunt sapiente repudiandae esse aperiam.
                </p>
                <div className="gridwrapper">
                  <div className="gridone"><Button width="auto">Login</Button></div>
                  <div className="gridtwo"><Button width="auto">Register</Button></div>
                </div>
              </>
            }
            right= {
              <img src="/illustration.svg" height="90%" alt="illustration" />
            }
            />

         <Outlet />
      </div>
  );
}