import React, { lazy, Suspense } from 'react';

const LazyCard = lazy(() => import('.'));

const Card = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCard {...props} />
  </Suspense>
);

export default Card;
