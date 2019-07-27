import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IStore, IRootState } from '../../../store';
import { SELECTED_PATIENT } from '../../../store/actionsTypes';
import { createStyles, makeStyles, FormControl, Theme, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { Patient } from '../../../lib/patient';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120
		},
		selectEmpty: {
			marginTop: theme.spacing(2)
		}
	})
);

const Patients: React.FC<PatientProps> = (props: PatientProps) => {
	const classes = useStyles();
	const patientService: Patient = new Patient(props.state.userId);
	patientService.setPerPage = 6;
	const [ patients ] = useState(patientService.getAll());
	const [ selectedPatient, setSelectedPateint ] = useState();

	const handleChange = (e: React.ChangeEvent<any>) => {
		const id = parseInt(e.target.value);
		setSelectedPateint(id);
		props.onSelect(id);
	};

	return (
		<FormControl className={classes.formControl}>
			<Select
				value={selectedPatient ? selectedPatient : ''}
				onChange={handleChange}
				name="age"
				displayEmpty
				className={classes.selectEmpty}
			>
				<MenuItem value="" disabled>
					Patient
				</MenuItem>
				{patients.map((p) => (
					<MenuItem value={p.id} key={p.id}>
						{p.firstname} {p.middleInitial}. {p.lastname} ({p.gender.charAt(0)},{' '}
						{new Date().getFullYear() - new Date(p.dateOfBirth).getFullYear()})
					</MenuItem>
				))}
			</Select>
			<FormHelperText>Patient</FormHelperText>
		</FormControl>
	);
};

interface PatientProps {
	state: IRootState;
	onSelect: (id: number) => void;
}

const mapStateToProps = (state: IStore) => {
	return {
		state: state.rootReducer
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return { onSelect: (patientId: number) => dispatch(SELECTED_PATIENT(patientId)) };
};

const connected = connect(mapStateToProps, mapDispatchToProps)(Patients);

export { connected as Patients };
