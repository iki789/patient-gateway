import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker, MaterialUiPickersDate } from '@material-ui/pickers';
import moment from '@date-io/moment';

export const SamplesChart: React.FC<SampleChartProps> = () => {
	const [ fromDate, setFromDate ] = useState(new Date('1 Jan 2019'));
	const [ toDate, setToDate ] = useState(new Date());

	const handleFromDateChange = (date: MaterialUiPickersDate) => {
		if (date) {
			setFromDate(new Date(date.format('MMM DD YYYY')));
		}
	};

	const handleToDateChange = (date: MaterialUiPickersDate) => {
		if (date) {
			setToDate(new Date(date.format('MMM DD YYYY')));
		}
	};

	return (
		<React.Fragment>
			<MuiPickersUtilsProvider utils={moment}>
				<Typography variant="h5">Sample Alle</Typography>
				<KeyboardDatePicker
					disableFuture
					openTo="year"
					format="DD MMM YYYY"
					label="From"
					views={[ 'year', 'month', 'date' ]}
					value={fromDate}
					onChange={handleFromDateChange}
				/>
				<KeyboardDatePicker
					disableFuture
					openTo="year"
					format="DD MMM YYYY"
					label="To"
					views={[ 'year', 'month', 'date' ]}
					value={toDate}
					onChange={handleToDateChange}
				/>
			</MuiPickersUtilsProvider>
		</React.Fragment>
	);
};

interface SampleChartProps {}
