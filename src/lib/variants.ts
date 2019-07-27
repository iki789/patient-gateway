import { Pagination } from './pagination';
import { Variants as VariantsDB, IVariant } from '../db/index';

export class Variant extends Pagination implements IBase {
	variants: IVariant[] = VariantsDB;

	constructor(variants: IVariant[] = []) {
		super(variants);
		this.items = this.variants;
	}

	getById(id: number) {
		return this.variants.filter((s) => s.id === id)[0];
	}

	getAll(page: number) {
		page = page < 1 ? 1 : page;
		this.items = this.variants;
		return this.getItemsOnPage(page);
	}

	getBySampleId(patientId: number, page: number) {
		this.items = this.variants.filter((v) => v.sampleId === patientId);
		return this.getItemsOnPage(page);
	}
}

interface IBase {
	getById: (id: number) => IVariant;
	getBySampleId: (id: number, page: number) => IVariant[];
	getAll: (page: number) => IVariant[];
}
