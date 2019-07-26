export interface IRootState {
	userId: number | null;
	selectedPatient?: number;
	selectedSample?: number;
}

export interface IStore {
	rootReducer: IRootState;
}
