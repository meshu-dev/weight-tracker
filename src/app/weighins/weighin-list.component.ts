import { Component } from '@angular/core';

import { WeighinService } from './weighin.service';
import { IWeighin } from './weighin';

@Component({
  templateUrl: './weighin-list.component.html',
  styleUrls: ['./weighin-list.component.css']
})

export class WeighinListComponent  {
  weighIns: IWeighin[] = [];
  page = 1;
  pageSize = 3;
  totalCount: number;

  constructor(private weighinService: WeighinService) { }

  ngOnInit(): void {
    this.getWeighIns(this.page);
  }

  /*
  getWeighIns(page: number): void {
    this.weighinService.get(page, this.pageSize).subscribe({
      next: weighIns => {
        this.weighIns = weighIns;
      },
      error: err => console.log('err', err)
    });
  } */

  getWeighIns(page: number): void {
    this.weighinService.get(page, this.pageSize)
      .subscribe({
        next: response => {

          console.log('RESPONSE!!!', response);

          /*
          if (response.headers.cache) {
            this.totalCount = response.headers.cache['X-Total-Count'];
          } else {
            this.totalCount = response.headers.get('X-Total-Count');
          } */

          this.totalCount = response.headers.get('X-Total-Count');
          this.weighIns = response.body;
        },
        error: err => console.log('err', err)
      });
  }
}
