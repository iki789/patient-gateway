import React, { lazy, Suspense } from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducers } from './store/reducers';
const Dashboard = lazy(() => import('./components/Dashboard'));
const Auth = lazy(() => import('./components/Auth/index'));

const store = createStore(reducers);

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Grid container>
					<Suspense fallback={'Loading...'}>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/login" component={Auth} />
					</Suspense>
				</Grid>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
