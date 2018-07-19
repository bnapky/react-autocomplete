import React, { Component } from 'react';
import SuggestionItem from './suggestion-item';

class SuggestionList extends Component {

  item = (user, i) => (
    <SuggestionItem
      content={`${user.firstname} ${user.lastname}`}  
      active={i == this.props.index} key={i}
      onClick={() => this.props.setUser(user)}>
        {`${user.firstname} ${user.lastname}`}
    </SuggestionItem>
  )

  render() {
    if(!this.props.visible)
      return null;

    return (
      <ul style={{width: this.props.width}} className="position-absolute suggestions">
        {
          this.props.dataset
          .map((user, i) => this.item(user,i))
        }
      </ul>
    );
  }
}

export default SuggestionList;
