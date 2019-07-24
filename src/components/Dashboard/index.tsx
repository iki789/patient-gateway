import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, withStyles  } from '@material-ui/core';
import { Auth } from '../../lib/auth';



class Dashboard extends Component<IDashboard & RouteComponentProps> {
  
  componentDidMount(){
    if(!Auth.isLoggedIn){
      this.props.history.push('/login')
    }
  }
  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
        <Toolbar>
          <Typography>CCG: Dashboard</Typography>
        </Toolbar>
        </AppBar>
        <Container className={this.props.classes.container}>
          <Typography variant="h4">
            Welcome <Typography display="inline" variant="h6">Dr. {Auth && Auth.user ? Auth.user.name : '' }</Typography> 
          </Typography>
        </Container >
      </React.Fragment>
    )
  }
}

interface IDashboard{
  classes: any
}

let styles = () => {
  return {
    container: {
      marginTop: '1rem'
    }
  }
}

export default withStyles(styles)(Dashboard);