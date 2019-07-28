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

	getByPatient(patientId: number | undefined, page: number): ISample[] {
		if (!patientId) return [];
		this.items = this.samples;
		this.items = this.samples.filter((s) => s.patientId === patientId);
		return this.sortByDate(this.getItemsOnPage(page));
	}

	getBetweenDatesByPatient(from: Date, to: Date, patientId: number, page: number): ISample[] {
		const fromTime = moment(from).format('x');
		const toTime = moment(to).format('x');
		this.items = this.samples.filter((s) => {
			let t = moment(s.date).format('x');
			return t >= fromTime && t <= toTime && s.patientId === patientId;
		});
		return this.sortByDate(this.getItemsOnPage(page));
	}

	sortByDate(samples: ISample[]) {
		return samples.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	}
}

interface IBase {
	getById: (id: number) => ISample;
	getByPatient: (id: number, page: number) => ISample[];
	getBetweenDatesByPatient: (from: Date, to: Date, patientId: number, page: number) => ISample[];
	getAll: (page: number) => ISample[];
}
