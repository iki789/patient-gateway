import { Pagination } from './pagination';
import { Samples as SamplesDB, ISample } from '../db/index';

export class Sample extends Pagination implements IBase {
	samples: ISample[] = SamplesDB;

	constructor(samples: ISample[] = []) {
		super(samples);
		this.items = this.samples;
	}

	getById(id: number) {
		return this.samples.filter((s) => s.id === id)[0];
	}

	getAll(page: number) {
		page = page < 1 ? 1 : page;
		this.items = this.samples;
		return this.getItemsOnPage(page);
	}

	getByPatient(patientId: number | undefined, page: number) {
		if (!patientId) return [];
		this.items = this.samples.filter((s) => s.patientId === patientId);
		return this.getItemsOnPage(page);
	}
}

interface IBase {
	getById: (id: number) => ISample;
	getByPatient: (id: number, page: number) => ISample[];
	getAll: (page: number) => ISample[];
}
