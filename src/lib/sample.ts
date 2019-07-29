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
		return this.samples;
	}

	getByPatientId(patientId: number | undefined, page: number | null, sort: Sort): ISample[] {
		if (!patientId) return [];
		this.items = this.samples.filter((s) => s.patientId === patientId);
		this.sort(this.items, sort);
		if (page) {
			return this.getItemsOnPage(page);
		}
		return this.items;
	}

	private sort(samples: ISample[], sort: Sort): ISample[] {
		if (sort.field === 'date') {
			samples.sort(
				(a, b) =>
					new Date(sort.direction === 'asc' ? a.date : b.date).getTime() -
					new Date(sort.direction === 'asc' ? b.date : a.date).getTime()
			);
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

export type Sort = { field: SortFields; direction: 'asc' | 'desc' };
export type SortFields = 'sampleType' | 'quality' | 'date';

interface IBase {
	getById: (id: number) => ISample;
	getByPatientId: (id: number, page: number, sort: Sort) => ISample[];
	getAll: (page: number) => ISample[];
}
