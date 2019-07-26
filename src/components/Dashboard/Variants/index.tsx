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
import Pagination from 'material-ui-flat-pagination';
import { IVariant } from '../../../db/schema';
import { Variant } from '../../../lib/variants';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(2)
		},
		table: {
			marginLeft: -theme.spacing(2),
			marginRight: -theme.spacing(2)
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

export const Variants: React.FC<PatientProps> = (props: PatientProps) => {
	const classes = useStyles();
	const variantService: Variant = new Variant();
	variantService.setPerPage = 6;
	const [ variants, setVariants ] = useState(variantService.getBySampleId(1, 1));
	const [ selectedVariant, setSelectedVariant ] = useState();
	const [ pageOffset, setPageOffset ] = useState(0);

	const handlePageChange = (e: React.MouseEvent<HTMLElement>, offset: number, page: number) => {
		setPageOffset(offset);
		setVariants(variantService.getBySampleId(1, page));
	};

	const handleRowClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
		setSelectedVariant(id);
		props.onSelect(id);
	};

// 	{
// 		"id": 0,
// 		"sampleId": 1,
// 		"reference_base": "T",
// 		"alternativeBase": "A",
// 		"geneName": "KRAS",
// 		"position": 25236753,
// 		"mutationType": "benign",
// 		"alleleFrequency": 0.11928613460360166
// },

	return (
		<Paper className={classes.paper}>
			<Typography variant="h5">Patient Samples</Typography>
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
							<TableRow
								hover={true}
								classes={{ selected: classes.selected, hover: classes.hover }}
								selected={selectedVariant === v.id}
								key={v.id}
								onClick={(e) => handleRowClick(e, v.id)}
							>
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
		</Paper>
	);
};

interface PatientProps {
	onSelect: (id: number) => void;
}
