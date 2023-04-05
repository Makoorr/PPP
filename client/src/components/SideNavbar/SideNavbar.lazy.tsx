import React, { lazy, Suspense } from 'react';

const LazySideNavbar = lazy(() => import('.'));

const SideNavbar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySideNavbar {...props} />
  </Suspense>
);

export default SideNavbar;
