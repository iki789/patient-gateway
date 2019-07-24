import React, { ChangeEvent } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

class Auths extends React.Component<AuthProps, AuthState>{

  state: AuthState = {
    controls:{
      username: {
        isValid: false,
        isDirty: false,
        value: ''
      },
      password: {
        isValid: false,
        isDirty: false,
        value: ''
      }
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    let { name, value } = e.target;
    if(name === 'username' || name === 'password'){
      this.setState({
        controls:{
          ...this.state.controls,
          [name]:{
            ...this.state.controls[name],
            value
          }
        }
      })
    }
  }

  render(){
    return (
      <Grid container className={this.props.classes.root} justify="center" direction="column" alignContent="center">
        <h1>Login</h1>
        <form>
            <TextField 
              className={this.props.classes.formControl} 
              type="text"
              onChange={this.handleChange}
              name="username"
              value={this.state.controls.username.value} 
              label="Username" fullWidth />
            <TextField 
              className={this.props.classes.formControl} 
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.controls.password.value} 
              label="Password" fullWidth />
            <Button variant="contained"  color="primary">Login</Button>
        </form>
      </Grid>
    )
  }
}

interface AuthProps{
  classes: any
}

interface AuthState{
  controls: {
    username:{
      isValid: boolean,
      isDirty: boolean,
      value: string
    },
    password:{
      isValid: boolean,
      isDirty: boolean,
      value: string
    }
  }
}

const styles = () => {
  return {
    root: {
      height: '100vh',
      width: '100vw',
      padding: '2rem'
    },
    formControl: {
      marginBottom: '2rem'
    }
  }
}

export default withStyles(styles, { withTheme: true })(Auths)
