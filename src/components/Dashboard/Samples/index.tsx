import React, { useState, useEffect } from 'react';
import {
	createStyles,
	makeStyles,
	Grid,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
	Theme,
	Typography
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, MaterialUiPickersDate } from '@material-ui/pickers';
import moment from '@date-io/moment';
import { connect } from 'react-redux';
import { IRootState } from '../../../store';
import { SELECT_SAMPLE } from '../../../store/actionsTypes';
import momentJs from 'moment';
import Pagination from 'material-ui-flat-pagination';
import { ISample } from '../../../db/schema';
import { Sample } from '../../../lib/sample';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		table: {
			overflow: 'hidden',
			overflowX: 'scroll',
			marginLeft: -theme.spacing(2),
			marginRight: -theme.spacing(2),
			height: 358
		},
		hover: {
			'&:hover': {
				cursor: 'pointer'
			}
		},
		placeholder: {
			color: theme.palette.grey[300]
		},
		selected: {
			backgroundColor: `${theme.palette.primary.light} !important`
		}
	})
);

const Samples: React.FC<PatientProps> = (props: PatientProps) => {
	const classes = useStyles();
	const sampleService: Sample = new Sample();
	sampleService.setPerPage = 6;
	const [ selectedSample, setSelectedSample ] = useState();
	const [ pageOffset, setPageOffset ] = useState(0);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ samples, setSamples ] = useState(
		props.patientId ? sampleService.getByPatient(props.patientId, currentPage) : []
	);
	const [ hasData, setHasData ] = useState(false);
	const [ fromDate, setFromDate ] = useState(new Date('1 Jan 2019'));
	const [ toDate, setToDate ] = useState(new Date());

	useEffect(
		() => {
			setSamples(props.patientId ? sampleService.getByPatient(props.patientId, currentPage) : []);
			setHasData(samples.length > 0);
		},
		[ props.patientId, currentPage, samples, hasData, sampleService ]
	);

	const handlePageChange = (e: React.MouseEvent<HTMLElement>, offset: number, page: number) => {
		setCurrentPage(page);
		setPageOffset(offset);
		if (props.patientId) {
			setSamples(sampleService.getByPatient(props.patientId, page));
		}
	};

	const handleRowClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
		setSelectedSample(id);
		props.onSelect(id);
	};

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

	const dateRangeSelect = (
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
	);

	const dataTable = (
		<div>
			{props.title ? <Typography variant="h5">{props.title}</Typography> : null}
			{props.showDatePicker ? dateRangeSelect : null}
			<div className={classes.table}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Type</TableCell>
							<TableCell>Quality</TableCell>
							<TableCell>MM/DD/YY</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{samples.map((s: ISample) => (
							<TableRow
								hover={true}
								classes={{ selected: classes.selected, hover: classes.hover }}
								selected={selectedSample === s.id}
								key={s.id}
								onClick={(e) => handleRowClick(e, s.id)}
							>
								<TableCell>{s.sampleType}</TableCell>
								<TableCell>{s.quality}</TableCell>
								<TableCell title={s.date}>{momentJs(s.date).calendar('', { sameElse: 'MM/DD/YY' })}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<Pagination
				limit={sampleService.perPage}
				offset={pageOffset}
				total={sampleService.items.length}
				currentPageColor="primary"
				onClick={handlePageChange}
			/>
		</div>
	);

	const placeholder = (
		<Grid container justify="center" alignContent="center" style={{ height: '100%' }}>
			<Grid item>
				<Typography variant="h5" className={classes.placeholder}>
					{props.patientId ? 'Patient has not samples' : 'Select patient to view samples'}
				</Typography>
			</Grid>
		</Grid>
	);

	return <React.Fragment>{hasData ? dataTable : placeholder}</React.Fragment>;
};

interface PatientProps {
	patientId: number | null;
	title?: string;
	showDatePicker?: boolean;
	onSelect: (id: number) => void;
}

const mapStateToProps = (state: IRootState) => {
	return {
		state,
		patientId: state.patientSamples.patientId
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onSelect: (sampleId: number) => dispatch(SELECT_SAMPLE(sampleId))
	};
};

const connected = connect(mapStateToProps, mapDispatchToProps)(Samples);

export { connected as Samples };
