import React, { FC } from 'react';
import { TaskContent, TaskDescription, TaskName, TaskWrapper } from './Task.styled';

interface TaskProps {
   name?: React.ReactNode;
   description?: React.ReactNode;
}

const Task: FC<TaskProps> = ({ name, description }) => (
 <TaskWrapper>
      <TaskContent>
         <TaskName>
            { name }
         </TaskName>
         <TaskDescription>
            { description }
         </TaskDescription>
      </TaskContent>
 </TaskWrapper>
);

export default Task;