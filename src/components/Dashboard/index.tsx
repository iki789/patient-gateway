import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Grid, AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import { Auth } from '../../lib/auth';
import { Patients } from './Patients';
import { Samples } from './Samples';
import { Variants } from './Variants';

class Dashboard extends Component<IDashboard & RouteComponentProps> {
	componentDidMount() {
		if (!Auth.isLoggedIn) {
			this.props.history.push('/login');
		}
	}

	hanldePatientSelect = (patientId: number) => {
		console.log(patientId);
	};

	render() {
		return (
			<React.Fragment>
				<AppBar position="static">
					<Toolbar>
						<Typography>CCG: Dashboard</Typography>
					</Toolbar>
				</AppBar>
				<Container className={this.props.classes.container}>
					<Typography variant="h5">Welcome </Typography>
					<Typography display="inline" variant="subtitle2">
						Dr. {Auth && Auth.user ? Auth.user.name : ''}
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Patients />
						</Grid>
						<Grid item xs={12} md={4}>
							<Samples />
						</Grid>
						<Grid item xs={12} md={8}>
							<Variants onSelect={this.hanldePatientSelect} />
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

let styles = () => {
	return {
		container: {
			marginTop: '1rem'
		}
	};
};

export default withStyles(styles)(Dashboard);
