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
        <h1>Task Management APP </h1>
        <h2>DevOps PPP Project</h2>
        <p>
        Effective management is crucial to the success of any organization. It involves planning, organizing, leading, and controlling resources to achieve the organization's goals and objectives. Good managers are able to inspire and motivate their teams to work together towards a common goal, while also ensuring that all tasks are completed efficiently and effectively. They must also be able to adapt to changing circumstances and make informed decisions in a timely manner. At the heart of effective management is the ability to communicate clearly and build positive relationships with colleagues, employees, customers, and stakeholders. Whether you're running a small business or a large corporation, investing in good management practices can help you achieve your goals, improve productivity, and ultimately drive success.
        </p>
        <div className="gridwrapper">
          <div className="gridone"><Link to='/login'><Button width="auto">Login</Button></Link></div>
          <div className="gridtwo"><Link to='/register'><Button width="auto">Register</Button></Link></div>
        </div>
    </>
  );
}