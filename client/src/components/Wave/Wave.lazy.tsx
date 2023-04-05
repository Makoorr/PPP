import React, { lazy, Suspense } from 'react';

const LazyWave = lazy(() => import('.'));

const Wave = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyWave {...props} />
  </Suspense>
);

export default Wave;
