import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { WeighinService } from './weighin.service';
import { IWeighin } from './weighin';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './weighin-edit.component.html',
  styleUrls: ['./weighin-edit.component.css']
})

export class WeighinEditComponent  {
  weighIns: IWeighin[] = [];
  date: NgbDateStruct;
  calendarIcon = faCalendar;

  constructor(
  	private calendar: NgbCalendar,
  	private weighinService: WeighinService
  ) { }

  ngOnInit(): void {
  	this.date = this.calendar.getToday();
  }

  onSubmit(form: NgForm) {
    console.log('in onsubmit!!!');
  }
}
