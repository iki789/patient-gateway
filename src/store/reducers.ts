import { combineReducers, Reducer } from 'redux';
import { IPatientSamples } from './';
import { actions } from './actions';

const intialStateViewPatientSamples: IPatientSamples = {
	patientId: null,
	sampleId: null
};

export const patientSamples: Reducer = (
	state: IPatientSamples = intialStateViewPatientSamples,
	action: { type: string; payload?: any }
): IPatientSamples => {
	switch (action.type) {
		case actions.SELECT_PATIENT:
			state = {
				sampleId: null,
				patientId: action.payload.patientId
			};
			break;
		case actions.SELECT_SAMPLE:
			state = {
				...state,
				sampleId: action.payload.sampleId
			};
			break;
	}
	return state;
};

export const reducers = combineReducers({
	patientSamples
});
