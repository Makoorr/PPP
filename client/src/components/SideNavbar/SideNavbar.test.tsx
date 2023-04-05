import React from 'react';
import ReactDOM from 'react-dom';
import SideNavbar from '.';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideNavbar />, div);
  ReactDOM.unmountComponentAtNode(div);
});