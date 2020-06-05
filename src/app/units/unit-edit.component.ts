import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../services/user.service';
import { CacheService } from './../services/cache.service';
import { MessageService } from './../services/message.service';

import { UnitService } from './unit.service';
import { Unit } from './unit';

@Component({
  templateUrl: './unit-edit.component.html'
})
export class UnitEditComponent {
  units: Unit[] = [];
  selectedUnit: Unit;

  constructor(
    private router: Router,
    private unitService: UnitService,
    private userService: UserService,
    private cacheService: CacheService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.unitService.getAll()
      .subscribe({
        next: units => {
          this.units = units;

          const user = this.userService.get();
          this.selectedUnit = this.findUnit(user.unitId);
        },
        error: err => console.log('err', err)
      });
  }

  private findUnit(unitId: number): Unit {
    for (const unit of this.units) {
      if (unit.id == unitId) { return unit; }
    }
    return null;
  }

  changeUnit(unitId: number) {
    this.selectedUnit = this.findUnit(unitId);
  }

  onSubmit() {
    const user = this.userService.get();

    this.unitService.updateUserUnit(user.userId, this.selectedUnit.id)
      .subscribe({
        next: result => {
          if (result.unitId) {
            user.unitId = result.unitId;
            user.unitShortName = result.unitShortName;

            this.userService.set(user);

            this.cacheService.deleteByUrlMatch('/weighins');

            this.router.navigate(['/']);
            this.messageService.sendMessage(`Unit has been changed to ${this.selectedUnit.name}`);
          }
        },
        error: err => console.log('err', err)
      });
  }
}
