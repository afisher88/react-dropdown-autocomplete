import React from 'react';
import { render } from 'react-dom';
import AutocompleteSelect from './components/AutocompleteSelect/AutocompleteSelect';
import './reset.css';
import './boilerplate.css';

render(
  <AutocompleteSelect
    label="Search fruit"
    placeholder="Please type the name of a fruit.."
    // onTextChangeFn={handleTyping}
  />,
  document.getElementById('root')
);
