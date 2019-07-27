export interface IRootState {
	rootReducer: IPreviewSample;
}

export interface IPreviewSample {
	viewPatientSamples: {
		patientId: number | null;
		sampleId: number | null;
	};
}
