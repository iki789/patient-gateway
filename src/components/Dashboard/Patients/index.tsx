import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SELECT_PATIENT } from '../../../store/actionsTypes';
import { createStyles, makeStyles, FormControl, Theme, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { Auth } from '../../../lib/auth';
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

	const patientService: Patient = new Patient(Auth.user ? Auth.user.id : null);
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
					Select Patient
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
	onSelect: (id: number) => void;
}

const mapDispatchToProps = (dispatch: any) => {
	return { onSelect: (patientId: number) => dispatch(SELECT_PATIENT(patientId)) };
};

const connected = connect(null, mapDispatchToProps)(Patients);

export { connected as Patients };
