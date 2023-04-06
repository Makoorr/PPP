import React, { FC } from 'react';
import Navbar from '../../components/Navbar';
import AddButton from '../../components/AddButton';
import SideNavbar from '../../components/SideNavbar';
import ContentNavbar from '../../components/ContentNavbar';
import Task from '../../components/Task';

interface TasksProps {}

export default function Tasks({}: TasksProps) {
   return (
      <div>
         <Navbar background="True">
            <li>
            <a href="/">Home</a>
            </li>
         </Navbar>

         <SideNavbar>
            <a>Tasks</a>
         </SideNavbar>

         <ContentNavbar
            header= {
            <h1 color="#000">Tasks</h1>
         }>
            <div>
               <AddButton svg={<img src="https://img.icons8.com/ios-glyphs/30/null/plus-math.png"/>}>
                  Add Task
               </AddButton>
               <Task 
                  name= "Task 1"
                  description= "This is a task"
               />
            </div>
         </ContentNavbar>
      </div>
   );
}