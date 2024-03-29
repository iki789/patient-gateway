export class Pagination implements IPagination {
	items: Array<any> = [];
	pages: number = 0;
	perPage: number;

	constructor(items: Array<any>, perPage: number = 25) {
		this.items = items;
		this.sortItems();
		this.perPage = perPage;
		this.calculatePages();
	}

	calculatePages(): void {
		this.pages = Math.ceil(this.items.length / this.perPage);
	}

	sortItems(): void {
		this.items.sort((a, b) => a - b);
	}

	getItemsOnPage(page: number): Array<any> {
		let skip = page * this.perPage - this.perPage;
		let pageItems: Array<any> = [];
		for (let i = 0; i < this.perPage; i++) {
			if (!this.items[skip + i]) {
				break;
			}
			pageItems.push(this.items[skip + i]);
		}
		return pageItems;
	}

	set setPerPage(perPage: number) {
		this.perPage = perPage;
	}

	get pageCount(): number {
		this.calculatePages();
		return this.pages;
	}
}

export interface IPagination {
	pages: number;
	perPage: number;
	calculatePages: () => void;
	getItemsOnPage: (page: number) => Array<any>;
}
