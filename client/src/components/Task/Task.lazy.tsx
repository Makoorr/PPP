import React, { lazy, Suspense } from 'react';

const LazyTask = lazy(() => import('.'));

const Task = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTask {...props} />
  </Suspense>
);

export default Task;
