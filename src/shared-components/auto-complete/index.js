import React, { Component } from 'react';
import { Form, FormGroup } from 'reactstrap';
import SuggestionList from './suggestion-list';
import './auto-complete.css';

class UserIndex extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      index: 0,
      focused: false
    }

    this.setUserClicked = this.setUserClicked.bind(this);
  }

  showSuggestions = () => this.state.focused && this.props.dataset.length > 0
    && this.input.current.value;

  getIndex = keyCode => {
    let addend = keyCode === 38 ? -1 : 1;  
    let index = this.state.index + addend;

    if(index >= this.props.dataset.length)
      index = this.props.dataset.length - 1;
    
    if(index < 0)
      index = 0;

    return index;
  }

  handleKeyDown = e => {
    
    if(!this.showSuggestions())
      return;

    if(e.keyCode === 38 || e.keyCode === 40)
      this.setState({...this.state, index: this.getIndex(e.keyCode)});
    
    if(e.keyCode === 13) {
      e.preventDefault();
      let user = this.props.dataset[this.state.index];
      this.props.setUser(user);
      this.input.current.value = `${user.firstname} ${user.lastname}`;
      this.input.current.blur();
    }
  };

  //decorate setUser
  setUserClicked = user => {
    this.props.setUser(user);
    this.input.current.value = `${user.firstname} ${user.lastname}`;
  }

  handleChange = () => {
    this.props.update(this.input.current.value);
  };
  
  setFocus = focused => setTimeout(() => this.setState({...this.state, focused}), 125)

  render() {
    let width = this.input.current ? this.input.current.offsetWidth : 0;
    return (
      <Form>
        <FormGroup>
          <input 
            ref= {this.input}
            className="form-control"
            type="text" name="user" id="user"
            placeholder="John Doe"
            autoComplete="off"
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            onFocus={e => this.setFocus(true)}
            onBlur={e => this.setFocus(false)}
          />
        <SuggestionList 
          dataset={this.props.dataset}
          width={width}
          visible={this.showSuggestions()} 
          index={this.state.index}
          setUser={this.setUserClicked}
          />
        </FormGroup>
      </Form>
    );
  }
}

export default UserIndex;
