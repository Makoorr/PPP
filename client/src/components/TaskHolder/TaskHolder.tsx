import React, { FC } from 'react';
import { TaskHolderWrapper } from './TaskHolder.styled';

interface TaskHolderProps {}

const TaskHolder: FC<TaskHolderProps> = () => (
 <TaskHolderWrapper>
    TaskHolder Component
 </TaskHolderWrapper>
);

export default TaskHolder;
