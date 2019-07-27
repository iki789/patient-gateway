import { Pagination } from './pagination';
import { Patients as PatientsDB, IPatient } from '../db/index';

export class Patient extends Pagination implements IBase {
	userId: number | undefined = undefined;
	patients: IPatient[] = [];

	constructor(userId: number, patients: IPatient[] = []) {
		super(patients);
		if (userId !== undefined) {
			this.userId = userId;
			this.patients = PatientsDB.filter((p) => p.userId === this.userId);
			this.items = this.patients;
		}
	}

	getById(id: number) {
		return this.patients.filter((p) => p.id === id)[0];
	}

	getAll() {
		return PatientsDB.filter((p) => p.userId === this.userId).sort((a, b) => {
			let x = a.firstname.toLowerCase();
			let y = b.firstname.toLowerCase();
			if (x < y) {
				return -1;
			}
			if (x > y) {
				return 1;
			}
			return 0;
		});
	}

	getAge(birthday: string): number {
		return new Date().getFullYear() - new Date(birthday).getFullYear();
	}
}

interface IBase {
	getById: (id: number) => IPatient;
	getAll: () => Array<IPatient>;
}
