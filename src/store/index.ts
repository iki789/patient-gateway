export interface IRootState {
	viewPatientSamples: IviewPatientSamples;
}

export interface IviewPatientSamples {
	patientId: number | null;
	sampleId: number | null;
}
