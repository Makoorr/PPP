import React, { lazy, Suspense } from 'react';

const LazyContentNavbar = lazy(() => import('.'));

const ContentNavbar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyContentNavbar {...props} />
  </Suspense>
);

export default ContentNavbar;
