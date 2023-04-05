import React from 'react';
import ReactDOM from 'react-dom';
import ContentNavbar from '.';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContentNavbar />, div);
  ReactDOM.unmountComponentAtNode(div);
});