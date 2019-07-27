import { combineReducers, Reducer } from 'redux';
import { IPreviewSample } from './';
import { actions } from './actions';

const intialState: IPreviewSample = {
	viewPatientSamples: {
		patientId: null,
		sampleId: null
	}
};

export const appReducer: Reducer = (
	state: IPreviewSample = intialState,
	action: { type: string; payload?: any }
): IPreviewSample => {
	switch (action.type) {
		case actions.SELECT_PATIENT:
			state = {
				...state,
				viewPatientSamples: {
					sampleId: null,
					patientId: action.payload.patientId
				}
			};
			break;
		case actions.SELECT_SAMPLE:
			state = {
				...state,
				viewPatientSamples: {
					...state.viewPatientSamples,
					sampleId: action.payload.sampleId
				}
			};
			break;
	}
	return state;
};

export const reducers = combineReducers({
	rootReducer: appReducer
});
