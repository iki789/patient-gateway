import React, { useState, useEffect, memo } from 'react';
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
import { connect } from 'react-redux';
import { IRootState } from '../../../store';
import { SELECT_SAMPLE } from '../../../store/actionsTypes';
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
	const [ selectedSample, setSelectedSample ] = useState();
	const [ pageOffset, setPageOffset ] = useState(0);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ samples, setSamples ] = useState(
		props.patientId ? sampleService.getByPatient(props.patientId, currentPage) : []
	);
	const [ hasData, setHasData ] = useState(false);

	useEffect(
		() => {
			setSamples(props.patientId ? sampleService.getByPatient(props.patientId, currentPage) : []);
			setHasData(samples.length > 0);
		},
		[ props.patientId, currentPage, samples, hasData ]
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
		<Grid container justify="center" alignContent="center" style={{ height: '100%' }}>
			<Grid item>
				<Typography variant="h5" className={classes.placeholder}>
					{props.patientId ? 'Patient has not samples' : 'Select patient to view samples'}
				</Typography>
			</Grid>
		</Grid>
	);

	return <Paper className={classes.paper}>{hasData ? dataTable : placeholder}</Paper>;
};

interface PatientProps {
	patientId: number | null;
	onSelect: (id: number) => void;
}

const mapStateToProps = (state: IRootState) => {
	return {
		state,
		patientId: state.rootReducer.viewPatientSamples.patientId
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onSelect: (sampleId: number) => dispatch(SELECT_SAMPLE(sampleId))
	};
};

const connected = connect(mapStateToProps, mapDispatchToProps)(Samples);

export { connected as Samples };
