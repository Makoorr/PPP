import React, { lazy, Suspense } from 'react';

const LazyTaskHolder = lazy(() => import('./TaskHolder'));

const TaskHolder = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTaskHolder {...props} />
  </Suspense>
);

export default TaskHolder;
