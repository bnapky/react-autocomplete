import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Autocomplete from '../../shared-components/auto-complete';
import UserService from '../../services/user-service';
import debounce from '../../services/debounce';
import UserCard from './user-card';
import './user-index.css';

class UserIndex extends Component {
  constructor() {
    super();
    this.state = {
      dataset: [],
      user: {}
    }
  }

  //Limit api interaction by debouncing autocomplete updates
  update = debounce(text => {
    if(!text) 
      return;
    this.fetchUsers({where: {substring: {value: text, fields: ['firstname', 'lastname']}}, skip: 0, limit: 10});
  }, this, 250);

  fetchUsers = filter => UserService.getUsers(filter)
  .then(response => response.data.sort((a ,b) => 
    (a.firstname + a.lastname).localeCompare(b.firstname + b.lastname)
  ))
  .then(users => this.setState({...this.state, dataset: users}));

  //If this were a more complex/robust app, 
  //complex props paths could be solved with redux
  setUser = user => this.setState({...this.state, user});

  render() {
    return (
      <Container className="d-flex justify-content-center align-items-center h-100">
        <div className="vw-wrapper w-100">
          <Row>
            <Col className="mt-2" xs="12">
              <Autocomplete dataset={this.state.dataset} update={this.update} setUser={this.setUser}/>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <UserCard user={this.state.user}/>
            </Col>
          </Row>
        </div>
    </Container>
    );
  }
}

export default UserIndex;
