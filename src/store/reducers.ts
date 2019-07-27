import { combineReducers, Reducer } from 'redux';
import { IRootState } from './';
import { actions } from './actions';
import { Auth } from '../lib/auth';

export let state: IRootState = {
	userId: Auth.isLoggedIn && Auth.user ? Auth.user.id : null
};

export const appReducer: Reducer = (
	rootStore: IRootState = state,
	action: { type: string; payload?: any }
): IRootState => {
	switch (action.type) {
		case actions.SELECTED_PATIENT:
			rootStore = {
				...rootStore,
				selectedPatient: action.payload.patientId
			};
	}
	return rootStore;
};

export const reducers = combineReducers({
	rootReducer: appReducer
});
