import React from 'react';
import { render } from 'react-dom';
import AutocompleteSelect from './components/AutocompleteSelect';

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' }
];

render(<AutocompleteSelect />, document.getElementById('root'));
