import { actions } from './actions';

export const SELECTED_PATIENT = (patientId: number) => {
	return {
		type: actions.SELECTED_PATIENT,
		payload: {
			patientId
		}
	};
};
