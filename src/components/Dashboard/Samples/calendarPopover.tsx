import React from 'react';
import { Button, Grid, makeStyles, Theme } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, MaterialUiPickersDate } from '@material-ui/pickers';
import moment from '@date-io/moment';

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			position: 'absolute',
			top: 0,
			left: 0,
			backgroundColor: theme.palette.common.white,
			width: '100%',
			height: '100%',
			margin: -theme.spacing(2),
			padding: theme.spacing(2),
			color: theme.palette.common.white,
			display: 'flex'
		}
	};
});

export const CalendarPopover = (props: CalendarPopoverProps) => {
	const classes = useStyles();

	const handleFromDateChange = (e: MaterialUiPickersDate) => {
		console.log(e);
	};

	return (
		<MuiPickersUtilsProvider utils={moment}>
			<div className={classes.root}>
				<Grid container spacing={2} alignContent="center" style={{ textAlign: 'center' }}>
					<Grid item xs={12}>
						<KeyboardDatePicker
							disableFuture
							openTo="year"
							format="DD MMM YYYY"
							label="From"
							views={[ 'year', 'month', 'date' ]}
							value={new Date()}
							onChange={handleFromDateChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<KeyboardDatePicker
							disableFuture
							openTo="year"
							format="DD MMM YYYY"
							label="To"
							views={[ 'year', 'month', 'date' ]}
							value={new Date()}
							onChange={handleFromDateChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button variant="text">Clear</Button>
						<Button variant="text">OK</Button>
					</Grid>
				</Grid>
			</div>
		</MuiPickersUtilsProvider>
	);
};

interface CalendarPopoverProps {}
