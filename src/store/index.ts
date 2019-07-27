export interface IRootState {
	patientSamples: IPatientSamples;
}

export interface IPatientSamples {
	patientId: number | null;
	sampleId: number | null;
	samplesBetween?: {
		from: Date;
		to: Date;
	};
}
