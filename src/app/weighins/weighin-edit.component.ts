import { Component } from '@angular/core';

import { WeighinService } from './weighin.service';
import { IWeighin } from './weighin';

@Component({
  templateUrl: './weighin-edit.component.html'
})

export class WeighinEditComponent  {
  weighIns: IWeighin[] = [];

  constructor(private weighinService: WeighinService) { }

  ngOnInit(): void {

  }
}
