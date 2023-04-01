import React, { FC } from 'react';
import { TasksWrapper } from './Tasks.styled';

interface TasksProps {}

export default function Tasks({}: TasksProps) {
   return (
      <TasksWrapper>
         <div>
         <h1>Tasks</h1>
         </div>
      </TasksWrapper>
   );
}
