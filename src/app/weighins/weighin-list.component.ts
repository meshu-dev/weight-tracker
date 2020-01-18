import { Component } from '@angular/core';

import { WeighinService } from './weighin.service';
import { IWeighin } from './weighin';

@Component({
  templateUrl: './weighin-list.component.html',
  styleUrls: ['./weighin-list.component.css']
})

export class WeighinListComponent  {
  weighIns: IWeighin[] = [];

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
