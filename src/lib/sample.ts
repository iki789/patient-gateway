import moment from 'moment';
import { Pagination } from './pagination';
import { Samples as SamplesDB, ISample } from '../db/index';

export class Sample extends Pagination implements IBase {
	samples: ISample[] = SamplesDB;

	constructor(samples: ISample[] = []) {
		super(samples);
		this.items = [];
	}

	getById(id: number): ISample {
		return this.samples.filter((s) => s.id === id)[0];
	}

	getAll(page: number): ISample[] {
		page = page < 1 ? 1 : page;
		this.items = this.samples;
		return this.getItemsOnPage(page);
	}

	getByPatientId(patientId: number | undefined, page: number, sort: Sort): ISample[] {
		if (!patientId) return [];
		let samples: ISample[] = [];
		this.items = this.samples;
		samples = this.items = this.samples.filter((s) => s.patientId === patientId);
		this.sort(samples, sort);
		return this.getItemsOnPage(page);
	}

	private sort(samples: ISample[], sort: Sort): ISample[] {
		if (sort.field === 'date') {
			samples.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		}
		if (sort.field === 'quality' || sort.field === 'sampleType') {
			samples.sort((a: ISample, b: ISample) => {
				if (a[sort.field] > b[sort.field]) {
					return sort.direction === 'asc' ? 1 : -1;
				}
				if (a[sort.field] < b[sort.field]) {
					return sort.direction === 'asc' ? -1 : 1;
				}
				return 0;
			});
		}
		return samples;
	}
}

export type Sort = { field: 'sampleType' | 'quality' | 'date'; direction: 'asc' | 'desc' };

interface IBase {
	getById: (id: number) => ISample;
	getByPatientId: (id: number, page: number, sort: Sort) => ISample[];
	getAll: (page: number) => ISample[];
}
