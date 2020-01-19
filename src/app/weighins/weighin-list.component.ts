import { Component } from '@angular/core';

import { WeighinService } from './weighin.service';
import { IWeighin } from './weighin';

import { CacheService } from './../services/cache.service';

@Component({
  templateUrl: './weighin-list.component.html',
  styleUrls: ['./weighin-list.component.css']
})
export class WeighinListComponent  {
  weighIns: IWeighin[] = [];
  totalCount: number;
  pageSize = 3;
  page = 1;

  constructor(
    private weighinService: WeighinService,
    private cacheService: CacheService
  ) { }

  ngOnInit(): void {
    this.getWeighIns(this.page);
  }

/*
get dateSuffix($filter) {
  var suffixes = ["th", "st", "nd", "rd"];
  return function(input) {
    var dtfilter = $filter('date')(input, 'MMMM dd');
    var day = parseInt(dtfilter.slice(-2));
    var relevantDigits = (day < 30) ? day % 20 : day % 30;
    //console.log(day, relevantDigits);
    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return dtfilter+suffix;
  };
} */

  getWeighIns(page: number): void {
    this.weighinService.get(page, this.pageSize)
      .subscribe({
        next: response => {
          this.totalCount = response.headers.get('X-Total-Count');
          this.weighIns = response.body.map(
            w => {
              w.date = new Date(w.date);
              return w;
            }
          );
        },
        error: err => console.log('err', err)
      });
  }

  deleteWeighIn(id: number) {
    console.log(`Id: ${id}`);

    this.weighinService.delete(id)
      .subscribe({
        next: response => {
          console.log('DELETE Response', response);

          this.cacheService.deleteByUrlMatch('/weighins');
          this.getWeighIns(this.page);
        },
        error: err => console.log('err', err)
      });
  }
}
