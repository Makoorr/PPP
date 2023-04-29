import React, { FC } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Wave from '../../components/Wave';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import './style.css'

interface MainProps {}

export default function Main({}: MainProps) {

  return (
    <>
        <h1>Task Management APP TEst</h1>
        <h2>DevOps PPP Project</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi qui eos a incidunt blanditiis doloribus temporibus neque? Corporis ipsa odit accusantium fugit mollitia porro cupiditate? Deserunt sapiente repudiandae esse aperiam.
        </p>
        <div className="gridwrapper">
          <div className="gridone"><Link to='/login'><Button width="auto">Login</Button></Link></div>
          <div className="gridtwo"><Link to='/register'><Button width="auto">Register</Button></Link></div>
        </div>
    </>
  );
}