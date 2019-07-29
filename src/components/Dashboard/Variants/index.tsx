import React, { useState, useEffect } from 'react';
import {
	createStyles,
	makeStyles,
	Grid,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
	TableSortLabel,
	TableHead,
	Theme,
	Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { IRootState } from '../../../store';
import { IVariant } from '../../../db/schema';
import { Variant } from '../../../lib/variants';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		table: {
			overflow: 'hidden',
			overflowX: 'scroll',
			marginLeft: -theme.spacing(2),
			marginRight: -theme.spacing(2)
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

const Variants: React.FC<PatientProps> = (props: PatientProps) => {
	const classes = useStyles();
	const [ pager, setPager ] = useState<Pager>({
		page: 1,
		perPage: 10,
		total: 0
	});
	const variantService: Variant = new Variant();
	variantService.setPerPage = pager.perPage;
	const [ variants, setVariants ] = useState(props.sampleId ? variantService.getBySampleId(props.sampleId, 0) : []);
	const [ sort, setSort ] = useState<Sort>({
		field: 'alleleFrequency',
		direction: 'desc'
	});

	useEffect(
		() => {
			const variants: IVariant[] = getVariants();
			if (variants.length > 0) {
				setPager({ ...pager, page: 1, total: variantService.items.length });
				setVariants(variants);
			} else {
				setVariants(variants);
				setPager({ ...pager, page: 1, total: variantService.items.length });
			}
		},
		[ props.sampleId, sort, setPager, setVariants ]
	);

	useEffect(
		() => {
			const variants: IVariant[] = getVariants();
			if (variants.length > 0) {
				setVariants(variants);
			}
		},
		[ pager.page, pager.perPage ]
	);

	const getVariants = (): IVariant[] => {
		if (props.sampleId) {
			return variantService.getBySampleId(props.sampleId, pager.page, sort);
		}
		return [];
	};

	const handleSort = (e: React.MouseEvent<HTMLElement>, field: 'alleleFrequency' | 'mutationType') => {
		setSort({
			field,
			direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc'
		});
	};

	const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
		// Page received is zero based while api page is not
		setPager({
			...pager,
			page: page + 1
		});
	};

	const handleChangePerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
		variantService.setPerPage = parseInt(e.target.value);
		setPager({ ...pager, page: 1, perPage: parseInt(e.target.value) });
	};

	const dataTable = (
		<div>
			<Typography variant="h5">Variants</Typography>
			<div className={classes.table}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Gene</TableCell>
							<TableCell>
								<TableSortLabel
									active={sort.field === 'mutationType'}
									direction={sort.direction}
									onClick={(e) => handleSort(e, 'mutationType')}
								>
									Mutation Type
								</TableSortLabel>
							</TableCell>
							<TableCell>Position</TableCell>
							<TableCell>Base</TableCell>
							<TableCell>Alt. Base</TableCell>
							<TableCell>
								<TableSortLabel
									active={sort.field === 'alleleFrequency'}
									direction={sort.direction}
									onClick={(e) => handleSort(e, 'alleleFrequency')}
								>
									Allele ƒ
								</TableSortLabel>
							</TableCell>
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
	);

	const placeholder = (
		<Grid container justify="center" alignContent="center">
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
}

const mapStateToProps = (state: IRootState) => {
	return {
		sampleId: state.patientSamples.sampleId
	};
};

type Pager = { page: number; perPage: number; total: number };
type Sort = { field: 'mutationType' | 'alleleFrequency'; direction: 'asc' | 'desc' };

const connected = connect(mapStateToProps)(Variants);

export { connected as Variants };
