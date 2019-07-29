import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Container, Grid, AppBar, Paper, Toolbar, Typography, Theme, withStyles } from '@material-ui/core';
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
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Patients />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Paper className={this.props.classes.paper}>
								<Samples title="Patient Samples" />
							</Paper>
						</Grid>
						<Grid item xs={12} md={8}>
							<Paper className={this.props.classes.paper}>
								<Variants />
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

let styles = (theme: Theme) => {
	return {
		container: {
			marginTop: theme.spacing(4)
		},
		paper: {
			padding: theme.spacing(2)
		}
	};
};

export default withStyles(styles)(Dashboard);
