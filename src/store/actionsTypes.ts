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

export const UPDATE_START_DATE = (date: string) => {
	return {
		type: actions.UPDATE_START_DATE,
		payload: {
			startDate: date
		}
	};
};

export const UPDATE_END_DATE = (date: string) => {
	return {
		type: actions.UPDATE_END_DATE,
		payload: {
			endDate: date
		}
	};
};
