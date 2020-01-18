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

  constructor(private weighinService: WeighinService) { }

  ngOnInit(): void {
    this.getWeighIns(this.page);
  }

  getWeighIns(page: number): void {
    this.weighinService.get(page, this.pageSize).subscribe({
      next: weighIns => {
        this.weighIns = weighIns;
      },
      error: err => console.log('err', err)
    });
  }
}
