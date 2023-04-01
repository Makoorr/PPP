import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Main />, div);
  ReactDOM.unmountComponentAtNode(div);
});