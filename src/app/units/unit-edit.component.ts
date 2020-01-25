import { Component } from '@angular/core';

import { UnitService } from './unit.service';
import { Unit } from './unit';

@Component({
  templateUrl: './unit-edit.component.html'
})
export class UnitEditComponent {
  units: Unit[] = [];
  selectedUnitIndex: number;

  constructor(private unitService: UnitService) { }

  ngOnInit(): void {
    this.selectedUnitIndex = 0;

    this.unitService.getAll()
      .subscribe({
        next: units => this.units = units,
        error: err => console.log('err', err)
      });
  }

  changeUnit(unitIndex: number) {
    this.selectedUnitIndex = unitIndex;
  }

  onSubmit() {
    console.log('this.selectedUnitIndex', this.selectedUnitIndex);
  }
}
