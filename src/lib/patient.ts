import { Pagination } from './pagination';
import { Patients as PatientsDB, IPatient } from '../db/index';

export class Patient extends Pagination implements IBase {
	userId: number;
	patients: IPatient[] = [];

	constructor(userId: number, patients: IPatient[] = []) {
		super(patients);
		this.userId = userId;
		this.patients = PatientsDB.filter((p) => p.userId === this.userId);
		this.items = this.patients;
	}

	getById(id: number) {
		return this.patients.filter((p) => p.id === id)[0];
	}

	getAll(page: number) {
		page = page < 1 ? 1 : page;
		return this.getItemsOnPage(page);
	}

	getAge(birthday: string): number {
		return new Date().getFullYear() - new Date(birthday).getFullYear();
	}
}

interface IBase {
	getById: (id: number) => IPatient;
	getAll: (page: number) => Array<IPatient>;
}
