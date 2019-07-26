import { combineReducers, Reducer } from 'redux';
import { IRootState } from './';
import { Auth } from '../lib/auth';

export const state: IRootState = {
	userId: Auth.isLoggedIn && Auth.user ? Auth.user.id : null
};

export const appReducer: Reducer = (
	rootStore: IRootState = state,
	action: { type: string; payload?: any }
): IRootState => {
	return rootStore;
};

export const reducers = combineReducers({
	rootReducer: appReducer
});
