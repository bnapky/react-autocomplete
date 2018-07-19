import React from 'react';

const SuggestionItem = props => (
  <li 
    className={props.active ? 'active' : ''}
    onClickCapture={props.onClick}
    >
    {props.children}
  </li>
)

export default SuggestionItem;
