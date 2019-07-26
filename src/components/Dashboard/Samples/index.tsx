import React, { useState } from 'react';
import {
	createStyles,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
	Theme,
	Typography
} from '@material-ui/core';
import moment from 'moment';
import { ISample } from '../../../db/schema';
import { Sample } from '../../../lib/sample';
import { Pagination } from '../../UI/Pagination';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(2)
		},
		hover: {
			'&:hover': {
				cursor: 'pointer'
			}
		},
		selected: {
			backgroundColor: `${theme.palette.primary.light} !important`
		}
	})
);

export const Samples: React.FC<PatientProps> = (props: PatientProps) => {
	const classes = useStyles();
	const sampleService: Sample = new Sample();
	sampleService.setPerPage = 6;
	const [ samples, setSamples ] = useState(sampleService.getByPatient(1, 1));
	const [ selectedSample, setSelectedSample ] = useState();

	const handlePageChange = (page: number) => {
		setSamples(sampleService.getByPatient(1, page));
	};

	const handleRowClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
		setSelectedSample(id);
		props.onSelect(id);
	};

	return (
		<Paper className={classes.paper}>
			<Typography variant="h5">Patient Samples</Typography>
			<div>
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
			<Pagination pageCount={sampleService.pageCount} handlePageChange={handlePageChange} />
		</Paper>
	);
};

interface PatientProps {
	onSelect: (id: number) => void;
}
