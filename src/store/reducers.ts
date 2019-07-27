import { combineReducers, Reducer } from 'redux';
import { IviewPatientSamples } from './';
import { actions } from './actions';

const intialState: IviewPatientSamples = {
	patientId: null,
	sampleId: null
};

export const viewPatientSamples: Reducer = (
	state: IviewPatientSamples = intialState,
	action: { type: string; payload?: any }
): IviewPatientSamples => {
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
	viewPatientSamples
});
