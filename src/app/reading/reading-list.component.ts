import { Component, OnInit } from '@angular/core';

import { IReading } from './reading';
import { ReadingRepositoryService } from './reading-repository.service';

@Component({
  /* selector: 'pm-products', */
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.css']
})
export class ReadingListComponent implements OnInit {
	pageTitle: string = 'Weight readings';
  errorMessage: string = '';
  readings: IReading[] = [];

  constructor(private readingRepositoryService:
    ReadingRepositoryService) { }

  	ngOnInit(): void {
	    console.log('In OnInit');

	    this.readingRepositoryService.getReadings().subscribe({
			next: readings => {
				this.readings = readings;

				console.log(this.readings);
			},
			error: err => this.errorMessage = err
		});
	}
}

/*
export class ProductListComponent implements OnInit {
	pageTitle: string = 'Product List!';
	imageWidth: number = 50;
	imageMargin: number = 2;
	showImage: boolean = false;
	errorMessage: string = '';

	_listFilter: string;
	get listFilter(): string {
		return this._listFilter;
	}
	set listFilter(value:string) {
		this._listFilter = value;
		this.filteredProducts = this.listFilter ?
			this.performFilter(this.listFilter) :
			this.products;
	}
	filteredProducts: IProduct[];
	products: IProduct[] = [];

	constructor(private productService: ProductService) { }

	performFilter(filterBy: string): IProduct[] {
		filterBy = filterBy.toLocaleLowerCase();

		if (this.products) {
			return this.products.filter(
				(product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
			);
		}
		return [];
	}

	ngOnInit(): void {
		console.log('In OnInit');

		this.products = this.productService.getProducts().subscribe({
			next: products => {
				this.products = products;
				this.filteredProducts = this.products;
			},
			error: err => this.errorMessage = err
		});
	}

	toggleImage(): void {
		this.showImage = !this.showImage;
	}

	onRatingClicked(message: string): void {
		this.pageTitle = 'Product List: '+ message;
	}
} */
