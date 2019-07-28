import React, { useState } from 'react';
import { Button, Grid, Zoom, makeStyles, Theme } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, MaterialUiPickersDate } from '@material-ui/pickers';
import moment from '@date-io/moment';
import momentJs from 'moment';

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
			display: 'flex',
			zIndex: 1
		}
	};
});

export const CalendarPopover = (props: CalendarPopoverProps) => {
	const classes = useStyles();
	const [ dates, setDates ] = useState<{ from: Date; to: Date }>({
		from: momentJs().subtract(6, 'months').toDate(),
		to: momentJs().toDate()
	});

	const handleFromDateChange = (e: MaterialUiPickersDate) => {
		if (e) {
			setDates({ ...dates, from: e.toDate() });
		}
	};

	const handleToDateChange = (e: MaterialUiPickersDate) => {
		if (e) {
			setDates({ ...dates, to: e.toDate() });
		}
	};

	return (
		<MuiPickersUtilsProvider utils={moment}>
			<Zoom in={true}>
				<div className={classes.root}>
					<Grid container spacing={2} alignContent="center" style={{ textAlign: 'center' }}>
						<Grid item xs={12}>
							<KeyboardDatePicker
								disableFuture
								openTo="year"
								format="DD MMM YYYY"
								label="From"
								views={[ 'year', 'month', 'date' ]}
								value={dates.from}
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
								value={dates.to}
								onChange={handleToDateChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button variant="text">Clear</Button>
							<Button variant="text">OK</Button>
						</Grid>
					</Grid>
				</div>
			</Zoom>
		</MuiPickersUtilsProvider>
	);
};

interface CalendarPopoverProps {}
