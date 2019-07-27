import { actions } from './actions';

export const SELECT_PATIENT = (patientId: number) => {
	return {
		type: actions.SELECT_PATIENT,
		payload: {
			patientId
		}
	};
};

export const SELECT_SAMPLE = (sampleId: number) => {
	return {
		type: actions.SELECT_SAMPLE,
		payload: {
			sampleId
		}
	};
};
