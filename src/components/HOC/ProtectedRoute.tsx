import React, { Component, PropsWithChildren } from 'react'
import { Redirect } from 'react-router-dom';
import { Auth } from '../../lib/auth';

export default class ProtectedRoute extends Component<PropsWithChildren<any>> {
  
  componentDidMount(){
    let auth = new Auth();
    if(!auth.isLoggedIn){
      return <Redirect to='/login' />
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    )
  }
}
