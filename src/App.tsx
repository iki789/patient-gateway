import React, { lazy, Suspense } from 'react';
import { Grid } from '@material-ui/core'
const Auth = lazy(() => import('./components/Auth/index'));

const App: React.FC = () => {
  return (
    <Grid container>
      <Suspense fallback={'Loading...'}>
        <Grid item xs={12}>
          <Auth />
        </Grid>
      </Suspense>
    </Grid>
  );
}

export default App;
