import React, { lazy, Suspense } from 'react';

const LazyAddButton = lazy(() => import('.'));

const AddButton = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddButton {...props} />
  </Suspense>
);

export default AddButton;
