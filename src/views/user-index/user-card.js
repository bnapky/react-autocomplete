import React, { Component } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';

class UserCard extends Component {
  render() {
    return (
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
                <Label for="first-name">First Name</Label>
                <Input 
                  type="text" name="first-name" id="first-name" 
                  value={this.props.user.firstname ? `${this.props.user.firstname}` : ' '}
                  readOnly={true}/>
            </FormGroup>
            <FormGroup>
                <Label for="last-name">Last Name</Label>
                <Input 
                  type="text" name="last-name" id="last-name" 
                  value={this.props.user.lastname ? `${this.props.user.lastname}` : ' '}
                  readOnly={true}/>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default UserCard;
