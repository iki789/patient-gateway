import React from 'react';
import { Grid, Button, TextField, makeStyles } from '@material-ui/core';

const Auth: React.FC  = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
      width: '100vw',
      padding: theme.spacing(3)
    },
    formControl: {
      marginBottom: theme.spacing(3)
    }
  }));
  
  const classes = useStyles();
  
  return (
    <Grid container className={classes.root} justify="center" xs={12} direction="column" alignContent="center">
      <h1>Login</h1>
      <form>
          <TextField className={classes.formControl} type="text" label="Username" fullWidth />
          <TextField className={classes.formControl} type="password" label="Password" fullWidth />
          <Button variant="contained"  color="primary">Login</Button>
      </form>
    </Grid>
  )
}

export default Auth;