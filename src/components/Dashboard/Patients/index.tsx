import React, { useState } from 'react';
import { createStyles, makeStyles, FormControl, Theme, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { IPatient } from '../../../db/schema/patient';
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

export const Patients: React.FC<PatientProps> = (props: PatientProps) => {
	const classes = useStyles();
	const patientService: Patient = new Patient(0);
	patientService.setPerPage = 6;
	const [ patients, setPatients ] = useState(patientService.getAll());
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
	onSelect: (id: number) => void;
}
