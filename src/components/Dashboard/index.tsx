import React, { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Auth } from '../../lib/auth';

class Dashboard extends Component<RouteComponentProps> {
  componentDidMount(){
    if(!Auth.isLoggedIn){
      this.props.history.push('/login')
    }
  }
  render() {
    return (
      <div>
        You are logged in!
      </div>
    )
  }
}

export default Dashboard;