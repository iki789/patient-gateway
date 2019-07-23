import React, { Component } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default class Auth extends Component {

  classes = useStyles();

  render() {
    return (
      <Grid container justify="center" alignContent="center">
        <Grid item>
          <h1>Login</h1>
        </Grid>
      </Grid>
    )
  }
}
