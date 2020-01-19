import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { WeighinService } from './weighin.service';
import { IWeighin } from './weighin';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import { CacheService } from './../services/cache.service';

@Component({
  templateUrl: './weighin-edit.component.html',
  styleUrls: ['./weighin-edit.component.css']
})

export class WeighinEditComponent  {
  weighIns: IWeighin[] = [];
  date: NgbDateStruct;
  calendarIcon = faCalendar;

  weighin: IWeighin = {
    weighinId: 0,
    date: '',
    value: ''
  };

  constructor(
  	private weighinService: WeighinService,
    private cacheService: CacheService,
    private router: Router,
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
  	this.weighin.date = this.calendar.getToday();
  }

  onSubmit() {
    console.log('in onsubmit!!!');
    console.log(this.weighin);

    this.weighin.date = "2013-01-20T00:00:00Z";

    this.weighinService.save(this.weighin)
      .subscribe({
        next: response => {
          console.log('SAVE SUBSCRIBE');
          console.log(response);

          if (response.status === 201) {
            this.cacheService.deleteByUrlMatch('/weighins');
            
            this.router.navigate(['/weighins']);
          } else {
            console.log('Issue adding weigh-in');
          }
        },
        error: err => console.log('err', err)
      });
  }
}
