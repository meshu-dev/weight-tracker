import { Component } from '@angular/core';

import { WeighinService } from './weighin.service';
import { IWeighin } from './weighin';

import { CacheService } from './../services/cache.service';
import { MessageService } from './../services/message.service';
import { UserService } from './../services/user.service';

@Component({
  templateUrl: './weighin-list.component.html',
  styleUrls: ['./weighin-list.component.css']
})
export class WeighinListComponent  {
  weighIns: IWeighin[] = [];
  totalCount: number;
  pageSize = 10;
  page = 1;

  constructor(
    private weighinService: WeighinService,
    private cacheService: CacheService,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getWeighIns(this.page);
  }

  public getStonePoundsValue(weighIn, unit): String {
    const values = weighIn.value.split('.');
    const units = unit.split(' ');

    const stone = `${values[0]} ${units[0]}`;

    const poundsValue = `${values[1]}.${values[2] || 0}`;
    const pounds = `${poundsValue} ${units[1]}`;

    return `${stone} ${pounds}`;
  }

  public getWeighIns(page: number): void {
    this.weighinService.getAll(page, this.pageSize)
      .subscribe({
        next: response => {
          const userData = this.userService.get();

          this.totalCount = response.headers.get('X-Total-Count');
          this.weighIns = response.body.map(
            w => {
              w.date = new Date(w.date);

              if (userData.unit === 'st lbs') {
                w.value  = this.getStonePoundsValue(w, userData.unit);
              } else {
                w.value  = `${w.value} ${userData.unit}`;
              }
              return w;
            }
          );
        },
        error: err => console.log('err', err)
      });
  }

  public deleteWeighIn(id: number) {
    this.weighinService.delete(id)
      .subscribe({
        next: response => {
          const weighIn = this.findWeighIn(id);

          this.cacheService.deleteByUrlMatch('/weighins');
          this.getWeighIns(this.page);

          this.messageService.sendMessage(`Weigh-In with ID ${weighIn.id} has been deleted`);
        },
        error: err => console.log('err', err)
      });
  }

  private findWeighIn(id: number) {
    for (const weighIn of this.weighIns) {
      if (weighIn.id === id) {
        return weighIn;
      }
    }
    return null;
  }
}
