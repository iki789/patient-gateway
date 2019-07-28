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

	getBySampleId(patientId: number, page: number, sort?: sort) {
		this.items = this.variants.filter((v) => v.sampleId === patientId);
		if (sort) {
			if (sort.field === 'mutationType') {
				this.items.sort((a: IVariant, b: IVariant) => {
					let mutationSeverity: { a: number; b: number } = {
						a: this.getMutationSeverity(a.mutationType),
						b: this.getMutationSeverity(b.mutationType)
					};
					return (
						mutationSeverity[sort.direction === 'asc' ? 'a' : 'b'] -
						mutationSeverity[sort.direction === 'asc' ? 'b' : 'a']
					);
				});
			} else if (sort.field === 'alleleFrequency') {
				this.items.sort(
					(a: IVariant, b: IVariant) =>
						sort.direction === 'asc' ? a.alleleFrequency - b.alleleFrequency : b.alleleFrequency - a.alleleFrequency
				);
			}
		}
		return this.getItemsOnPage(page);
	}

	private getMutationSeverity(mutationType: string): number {
		switch (mutationType) {
			case 'moderate_risk':
				return 1;
			case 'severe':
				return 2;
			default:
				return 0;
		}
	}
}

type sort = {
	field: 'mutationType' | 'alleleFrequency';
	direction: 'asc' | 'desc';
};

interface IBase {
	getById: (id: number) => IVariant;
	getBySampleId: (id: number, page: number) => IVariant[];
	getAll: (page: number) => IVariant[];
}
