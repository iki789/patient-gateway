import React, { Component, Suspense } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
	Button,
	Container,
	Grid,
	IconButton,
	AppBar,
	Paper,
	Toolbar,
	Typography,
	Theme,
	withStyles
} from '@material-ui/core';
import { ShowChart } from '@material-ui/icons';
import { Auth } from '../../lib/auth';
import CircularProgress from '../UI/Loader';
import { Patients } from './Patients';
const SamplesChart = React.lazy(() => import('./Samples/chart').then((module) => ({ default: module.SamplesChart })));
const Samples = React.lazy(() => import('./Samples').then((module) => ({ default: module.Samples })));
const Variants = React.lazy(() => import('./Variants').then((module) => ({ default: module.Variants })));

class Dashboard extends Component<IDashboard & RouteComponentProps, IDashboardState> {
	state: IDashboardState = {
		showChart: false
	};

	componentDidMount() {
		if (!Auth.isLoggedIn) {
			this.props.history.push('/login');
		}
	}

	logout = () => {
		Auth.logout();
		this.props.history.push('/login');
	};

	render() {
		return (
			<React.Fragment>
				<AppBar position="static">
					<Toolbar>
						<Container>
							<Grid container alignItems="center">
								<Grid item style={{ flexGrow: 1 }}>
									<Typography>Patient Gateway</Typography>
								</Grid>
								<Grid item>
									<Button style={{ color: '#fff' }} onClick={this.logout}>
										Logout
									</Button>
								</Grid>
							</Grid>
						</Container>
					</Toolbar>
				</AppBar>
				<Container className={this.props.classes.container}>
					<Typography variant="h5">Welcome </Typography>
					<Typography display="inline" variant="subtitle2">
						Dr. {Auth && Auth.user ? Auth.user.name : ''}
					</Typography>
					<Grid container spacing={2} alignItems="center">
						<Grid item>
							<Patients />
						</Grid>
						<Grid item>
							<IconButton onClick={() => this.setState({ showChart: !this.state.showChart })}>
								<ShowChart className={this.state.showChart ? this.props.classes.activeChart : ''} />
							</IconButton>
						</Grid>
						<Grid item xs={12}>
							<Suspense fallback={<div />}>
								<SamplesChart showChart={this.state.showChart} />
							</Suspense>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Paper className={this.props.classes.paper}>
								<Suspense fallback={<CircularProgress />}>
									<Samples />
								</Suspense>
							</Paper>
						</Grid>
						<Grid item xs={12} md={8}>
							<Paper className={this.props.classes.paper}>
								<Suspense fallback={<CircularProgress />}>
									<Variants />
								</Suspense>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</React.Fragment>
		);
	}
}

interface IDashboard {
	classes: any;
}

interface IDashboardState {
	showChart: boolean;
}

let styles = (theme: Theme) => {
	return {
		container: {
			marginTop: theme.spacing(4)
		},
		paper: {
			padding: theme.spacing(2)
		},
		activeChart: {
			color: theme.palette.secondary.main
		}
	};
};

export default withStyles(styles)(Dashboard);
