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
import { connect } from 'react-redux';
import { IRootState } from '../../../store';
import Pagination from 'material-ui-flat-pagination';
import { IVariant } from '../../../db/schema';
import { Variant } from '../../../lib/variants';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		table: {
			overflow: 'hidden',
			overflowX: 'scroll',
			marginLeft: -theme.spacing(2),
			marginRight: -theme.spacing(2),
			height: 358
		},
		placeholder: {
			color: theme.palette.grey[300]
		},
		selected: {
			backgroundColor: `${theme.palette.primary.light} !important`
		}
	})
);

const Variants: React.FC<PatientProps> = (props: PatientProps) => {
	const classes = useStyles();
	const variantService: Variant = new Variant();
	variantService.setPerPage = 6;
	const [ variants, setVariants ] = useState(props.sampleId ? variantService.getBySampleId(props.sampleId, 0) : []);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ pageOffset, setPageOffset ] = useState(0);

	useEffect(
		() => {
			setVariants(props.sampleId ? variantService.getBySampleId(props.sampleId, currentPage) : []);
		},
		[ variants, currentPage, props.sampleId, variantService ]
	);

	const handlePageChange = (e: React.MouseEvent<HTMLElement>, offset: number, page: number) => {
		setPageOffset(offset);
		setCurrentPage(page);
		setVariants(props.sampleId ? variantService.getBySampleId(props.sampleId, page) : []);
	};

	const dataTable = (
		<div>
			<Typography variant="h5">Variants</Typography>
			<div className={classes.table}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Gene</TableCell>
							<TableCell>Mutation Type</TableCell>
							<TableCell>Position</TableCell>
							<TableCell>Base</TableCell>
							<TableCell>Alt. Base</TableCell>
							<TableCell>Allele ƒ</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{variants.map((v: IVariant) => (
							<TableRow hover={true} key={v.id}>
								<TableCell>{v.geneName}</TableCell>
								<TableCell>{v.mutationType}</TableCell>
								<TableCell>{v.position}</TableCell>
								<TableCell>{v.reference_base}</TableCell>
								<TableCell>{v.alternativeBase}</TableCell>
								<TableCell>{v.alleleFrequency}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<Pagination
				limit={variantService.perPage}
				offset={pageOffset}
				total={variantService.items.length}
				currentPageColor="primary"
				onClick={handlePageChange}
			/>
		</div>
	);

	const placeholder = (
		<Grid container justify="center" alignContent="center" style={{ height: '100%' }}>
			<Grid item>
				<Typography variant="h5" className={classes.placeholder}>
					{props.sampleId ? 'Sample has no variants' : 'Select sample to view variants'}
				</Typography>
			</Grid>
		</Grid>
	);

	return <React.Fragment>{variants.length > 0 ? dataTable : placeholder}</React.Fragment>;
};

interface PatientProps {
	sampleId: number | null;
	onSelect: (id: number) => void;
}

const mapStateToProps = (state: IRootState) => {
	return {
		sampleId: state.patientSamples.sampleId
	};
};

const connected = connect(mapStateToProps)(Variants);

export { connected as Variants };
