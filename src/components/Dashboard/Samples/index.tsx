import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IStore, IRootState } from '../../../store';
import {
	createStyles,
	makeStyles,
	Paper,
	Grid,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
	Theme,
	Typography
} from '@material-ui/core';
import moment from 'moment';
import Pagination from 'material-ui-flat-pagination';
import { ISample } from '../../../db/schema';
import { Sample } from '../../../lib/sample';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(2),
			height: 400
		},
		table: {
			overflow: 'hidden',
			overflowX: 'scroll',
			marginLeft: -theme.spacing(2),
			marginRight: -theme.spacing(2),
			height: 348
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
	const [ samples, setSamples ] = useState(sampleService.getByPatient(props.state.selectedPatient, 1));
	const [ selectedSample, setSelectedSample ] = useState();
	const [ pageOffset, setPageOffset ] = useState(0);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ hasData, setHasData ] = useState(false);

	useEffect(
		() => {
			let patients = sampleService.getByPatient(props.state.selectedPatient, currentPage);
			setSamples(patients);
			setHasData(patients.length > 0);
		},
		[ hasData, currentPage, sampleService, props.state.selectedPatient ]
	);

	const handlePageChange = (e: React.MouseEvent<HTMLElement>, offset: number, page: number) => {
		setCurrentPage(page);
		setPageOffset(offset);
		setSamples(sampleService.getByPatient(props.state.selectedPatient, page));
	};

	const handleRowClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
		setSelectedSample(id);
		props.onSelect(id);
	};

	const dataTable = (
		<div>
			<Typography variant="h5">Patient Samples</Typography>
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
								<TableCell title={s.date}>{moment(s.date).calendar('', { sameElse: 'MM/DD/YY' })}</TableCell>
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
		<Grid container alignContent="center" style={{ height: '100%' }}>
			<Grid item>
				<Typography variant="h5" className={classes.placeholder}>
					{props.state.selectedPatient ? 'Patient has not samples' : 'Select patient to view samples'}
				</Typography>
			</Grid>
		</Grid>
	);

	return <Paper className={classes.paper}>{hasData ? dataTable : placeholder}</Paper>;
};

interface PatientProps {
	onSelect: (id: number) => void;
	state: IRootState;
}

const mapStateToProps = (state: IStore) => {
	return {
		state: state.rootReducer
	};
};

const connected = connect(mapStateToProps)(Samples);

export { connected as Samples };
