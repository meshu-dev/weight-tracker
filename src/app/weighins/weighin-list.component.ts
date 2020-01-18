import { Component } from '@angular/core';

import { WeighinService } from './weighin.service';
import { IWeighin } from './weighin';

const WEIGHINS: IWeighin[] = [
  {
    weighinId: 1,
    date: 111,
    value: '32'
  },
  {
    weighinId: 2,
    date: 22,
    value: '52'
  },
  {
    weighinId: 3,
    date: 543,
    value: '55'
  }
];

@Component({
  templateUrl: './weighin-list.component.html',
  styleUrls: ['./weighin-list.component.css']
})

export class WeighinListComponent  {
  weighIns: IWeighin[] = WEIGHINS; // = [];

  constructor(private weighinService: WeighinService) { }

  ngOnInit(): void {
    this.weighinService.get().subscribe({
      next: weighIns => {
        this.weighIns = weighIns;
      },
      error: err => console.log('err', err)
    });
  }
}
