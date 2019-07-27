export interface IRootState {
	patientSamples: IPatientSamples;
	samplesChart: ISamplesChart;
}

export interface IPatientSamples {
	patientId: number | null;
	sampleId: number | null;
}

export interface ISamplesChart {
	startData: string;
	endDate: string;
}
