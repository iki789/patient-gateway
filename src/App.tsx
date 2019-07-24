import React, { lazy, Suspense } from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
<<<<<<< HEAD
const Auth = lazy(() => import('./components/Auth'));
=======
const Dashboard = lazy(() => import('./components/Dashboard'));
const Auth = lazy(() => import('./components/Auth/index'));
>>>>>>> auth

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Grid container>
        <Suspense fallback={'Loading...'}>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/login' component={Auth} />
        </Suspense>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
