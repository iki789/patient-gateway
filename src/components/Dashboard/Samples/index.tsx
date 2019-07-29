import React, { useState, useEffect } from 'react';
import {
	createStyles,
	makeStyles,
	Grid,
	IconButton,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
	TableHead,
	Theme,
	Typography
} from '@material-ui/core';
import { Alarm } from '@material-ui/icons';
import { connect } from 'react-redux';
import momentJs from 'moment';
import { IRootState } from '../../../store';
import { SELECT_SAMPLE } from '../../../store/actionsTypes';
import { ISample } from '../../../db/schema';
import { Sample } from '../../../lib/sample';
import { CalendarPopover, Dates } from './calendarPopover';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		wrapper: {
			position: 'relative'
		},
		table: {
			overflow: 'hidden',
			overflowX: 'scroll',
			marginLeft: -theme.spacing(2),
			marginRight: -theme.spacing(2)
		},
		hover: {
			'&:hover': {
				cursor: 'pointer'
			}
		},
		activePicker: {
			color: theme.palette.primary.main
		},
		placeholder: {
			color: theme.palette.grey[300],
			textAlign: 'center',
			marginTop: '55%',
			marginBottom: '55%'
		},
		selected: {
			backgroundColor: `${theme.palette.primary.light} !important`
		}
	})
);

const Samples: React.FC<PatientProps> = (props: PatientProps) => {
	const classes = useStyles();
	const [ selectedSample, setSelectedSample ] = useState();
	const [ datePicker, setDatePicker ] = useState<Dates & { use: boolean }>({
		use: false,
		from: new Date(),
		to: new Date()
	});
	const [ showDatePicker, setShowDatePicker ] = useState(false);
	const [ pager, setPager ] = useState<Pager>({
		page: 1,
		perPage: 5,
		total: 0
	});
	const sampleService: Sample = new Sample();
	sampleService.setPerPage = pager.perPage;
	const [ samples, setSamples ] = useState<ISample[]>([]);

	useEffect(
		() => {
			let samples = getSamples();
			if (samples.length > 0) {
				setPager({ ...pager, total: sampleService.items.length });
				setSamples(samples);
			} else {
				setSamples(samples);
				setPager({ ...pager, page: 1, total: sampleService.items.length });
			}
		},
		[ props.patientId, datePicker ]
	);

	useEffect(
		() => {
			const samples: ISample[] = getSamples();
			if (samples.length > 0) {
				setSamples(samples);
			}
		},
		[ pager.page, pager.perPage ]
	);

	const getSamples = (): ISample[] => {
		if (props.patientId) {
			if (datePicker.use) {
				return sampleService.getBetweenDatesByPatient(datePicker.from, datePicker.to, props.patientId, pager.page);
			} else {
				return sampleService.getByPatient(props.patientId, pager.page);
			}
		}
		return [];
	};

	const handleRowClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
		setSelectedSample(id);
		props.onSelect(id);
	};

	const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
		// Page received is zero based while api page is not
		setPager({
			...pager,
			page: page + 1
		});
	};

	const handleChangePerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
		sampleService.setPerPage = parseInt(e.target.value);
		setPager({ ...pager, page: 1, perPage: parseInt(e.target.value) });
	};

	const handleCalendarChange = (dates: Dates) => {
		setDatePicker({ use: true, from: dates.from, to: dates.to });
		setShowDatePicker(false);
	};

	const handleCalendarCancel = () => {
		setDatePicker({ ...datePicker, use: false });
		setShowDatePicker(false);
	};

	const datePickerButton = (
		<IconButton style={{ marginTop: -8 }} onClick={() => setShowDatePicker(true)}>
			<Alarm className={datePicker.use ? classes.activePicker : ''} />
		</IconButton>
	);

	const header = (
		<Grid container>
			<Grid item style={{ flexGrow: 1 }}>
				<Typography variant="h5">{props.title}</Typography>
			</Grid>
			<Grid item>{datePickerButton}</Grid>
		</Grid>
	);

	const dataTable = (
		<div>
			{props.title || datePicker.use ? header : null}
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
								selected={props.showDatePicker ? false : selectedSample === s.id}
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
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component="div"
					count={pager.total}
					rowsPerPage={pager.perPage}
					page={pager.page - 1}
					backIconButtonProps={{
						'aria-label': 'previous page'
					}}
					nextIconButtonProps={{
						'aria-label': 'next page'
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangePerPage}
				/>
			</div>
		</div>
	);

	const placeholderMessage = (
		<Typography variant="h5" className={classes.placeholder}>
			{!props.patientId ? 'Select patient to view samples' : ''}
			{props.patientId && samples.length < 1 ? 'Patient has no samples' : ''}
			{props.patientId && datePicker.use ? ` in current date range` : ''}
			<br />
			{props.patientId && datePicker.use ? datePickerButton : ''}
		</Typography>
	);

	const placeholder = (
		<Grid container justify="center" alignContent="center">
			<Grid item>{placeholderMessage}</Grid>
		</Grid>
	);

	return (
		<div className={classes.wrapper}>
			<CalendarPopover show={showDatePicker} onCancel={handleCalendarCancel} onChange={handleCalendarChange} />
			{pager.total > 0 ? dataTable : placeholder}
		</div>
	);
};

interface PatientProps {
	patientId: number | null;
	title?: string;
	showDatePicker?: boolean;
	onSelect: (id: number) => void;
}

type Pager = { page: number; perPage: number; total: number };

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
