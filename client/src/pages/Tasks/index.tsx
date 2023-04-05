import React, { FC } from 'react';
import './style.css'
import Navbar from '../../components/Navbar';

interface TasksProps {}

export default function Tasks({}: TasksProps) {
   return (
      <div>
         <Navbar background="True">
            <li>
            <a href="/">Home</a>
            </li>
         </Navbar>
         <div className="sidenav">
            <a>Tasks</a>
         </div>
         <div className="contentnav">
            <h1 color="#000">Tasks</h1>
         </div>
      </div>
   );
}