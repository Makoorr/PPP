import React, { lazy, Suspense } from 'react';

const LazyMain = lazy(() => import('./Main'));

const Main = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMain {...props} />
  </Suspense>
);

export default Main;
