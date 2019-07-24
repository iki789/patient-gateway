import React, { ChangeEvent } from 'react';
import { RouteComponentProps  } from 'react-router-dom';
import { Grid, Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Auth } from '../../lib/auth';

class Auths extends React.Component<RouteComponentProps<{}> & AuthProps, AuthState>{

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
    },
    isValid: false,
    isLoading: false
  }

  componentDidMount(){
    if(Auth.isLoggedIn){
      this.props.history.push('/')
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>):void=>{
    let name: string = e.target.name;
    let value: string = e.target.value; 
    if(name === 'username' || name === 'password'){
      this.setState({
        controls:{
          ...this.state.controls,
          [name]:{
            ...this.state.controls[name],
            isDirty: true,
            value
          }
        }
      }, ()=>{
        this.validateInput(name === 'username' ? 'username' : 'password');
      })
    }
  }

  validateInput(name: "username" | "password"): boolean{
    let value = (this.state.controls[name].value).trim();
    if(name === 'username'){
      if(value.length < 3 || value.includes(' ')){
        this.setIsValidProperty(name, false);
        return false;
      }
    }
    if(name === 'password'){
      if(value.length < 1){
        this.setIsValidProperty(name, false);
        return false;
      }
    }

    this.setIsValidProperty(name, true);
    return true;
  }

  validateForm():boolean{
    if(!this.state.controls.username.isValid || !this.state.controls.password.isValid){
      return false;
    }
    return true;
  }

  private setIsValidProperty(name: "username" | "password", value: boolean):void{
    this.setState({
      controls:{
        ...this.state.controls,
        [name]:{
          ...this.state.controls[name],
          isValid: value
        }
      }
    }, ()=>{
      this.setState({ isValid: (this.state.controls.username.isValid && this.state.controls.password.isValid)})
    })
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
              label="Username" fullWidth 
              error={(!this.state.controls.username.isValid && this.state.controls.username.isDirty)}/>
            <TextField 
              className={this.props.classes.formControl} 
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.controls.password.value} 
              error={(!this.state.controls.password.isValid && this.state.controls.password.isDirty)}
              label="Password" fullWidth />
            <Button variant="contained"  color="primary" disabled={!this.state.isValid}>Login</Button>
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
  },
  isValid: boolean,
  isLoading: boolean
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