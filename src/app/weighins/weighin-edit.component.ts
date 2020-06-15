import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

import { WeighinService } from './weighin.service';
import { IWeighin } from './weighin';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

import { CacheService } from './../services/cache.service';
import { MessageService } from './../services/message.service';

import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './weighin-edit.component.html',
  styleUrls: ['./weighin-edit.component.css']
})

export class WeighinEditComponent  {
  isAdd: boolean;
  pageTitle: string;
  buttonText: string;
  weighIn: IWeighin;
  date: NgbDateStruct;
  calendarIcon = faCalendarDay;

  updatedWeighIn: IWeighin;
  weighin: IWeighin = {
    id: 0,
    date: '',
    value: ''
  };

  constructor(
    private weighinService: WeighinService,
    private cacheService: CacheService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private calendar: NgbCalendar
  ) { }

  onInit(): void {
    const segments: UrlSegment[] = this.route.snapshot.url;
    this.isAdd = segments[0].path === 'add' ? true : false;

    if (this.isAdd === true) {
      this.addPage();
    } else {
      this.editPage();
    }
  }

  getFormDate(timestamp: string): NgbDate {
    const date = new Date(timestamp);

    return new NgbDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
  }

  addPage() {
    this.pageTitle = 'Add Weigh In';
    this.buttonText = 'Add';
    this.weighin.date = this.calendar.getToday();
  }

  editPage() {
    this.pageTitle = 'Edit Weigh In';
    this.buttonText = 'Edit';

    const resolvedData: IWeighin = this.route.snapshot.data.resolvedData;

    if (resolvedData) {
      //const weighIn = resolvedData.weighIn;
      const weighIn = resolvedData;
      weighIn.date = this.getFormDate(weighIn.date);

      this.weighin = weighIn;
    }
  }

  onSubmit() {
    console.log('in onsubmit!!!');
    console.log(this.weighin);

    this.updateData();

    if (this.isAdd === true) {
      this.addWeighIn();
    } else {
      this.editWeighIn();
    }
  }

  updateData() {
    this.updatedWeighIn = Object.assign({}, this.weighin);

    const date = this.updatedWeighIn.date;
    const timestamp = `${date.year}-${date.month}-${date.day}T00:00:00Z`;

    this.updatedWeighIn.date = timestamp;
  }

  addWeighIn() {
    this.weighinService.add(this.updatedWeighIn)
      .subscribe({
        next: response => {
          if (response.status === 201) {
            this.cacheService.deleteByUrlMatch('/weighins');
            this.router.navigate(['/weighins']);

            this.messageService.sendMessage('New weigh in has been added');
          } else {
            console.log('Issue adding weigh-in');
          }
        },
        error: err => console.log('err', err)
      });
  }

  editWeighIn() {
    this.weighinService.edit(this.updatedWeighIn)
      .subscribe({
        next: response => {
          if (response.status === 200) {
            this.cacheService.deleteByUrlMatch('/weighins');
            this.router.navigate(['/weighins']);

            this.messageService.sendMessage(`Weigh-In with ID ${this.weighin.id} has been edited`);
          } else {
            console.log('Issue adding weigh-in');
          }
        },
        error: err => console.log('err', err)
      });
  }
}
