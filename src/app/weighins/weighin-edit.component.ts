import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

import { WeighinService } from './weighin.service';
import { IWeighin } from './weighin';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

import { CacheService } from './../services/cache.service';
import { AlertMsgService } from './../services/alert-msg.service';

import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './weighin-edit.component.html',
  styleUrls: ['./weighin-edit.component.css']
})

export class WeighinEditComponent  {
  pageTitle: string;
  buttonText: string;
  weighIn: IWeighin;
  date: NgbDateStruct;
  calendarIcon = faCalendarDay;

  weighin: IWeighin = {
    weighinId: 0,
    date: '',
    value: ''
  };

  constructor(
  	private weighinService: WeighinService,
    private cacheService: CacheService,
    private alertMsgService: AlertMsgService,
    private router: Router,
    private route: ActivatedRoute,
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
    const segments: UrlSegment[] = this.route.snapshot.url;
    const isAdd: boolean = segments[0].path === 'add' ? true : false;

    if (isAdd === true) {
      this.addPage();
    } else {
      this.editPage();
    }
  }

  addPage() {
    this.pageTitle = 'Add Weigh In';
    this.buttonText = 'Add';
    this.weighin.date = this.calendar.getToday();

    console.log(this.calendar.getToday());
  }

  editPage() {
    this.pageTitle = 'Edit Weigh In';
    this.buttonText = 'Edit';

    const resolvedData: IWeighin = this.route.snapshot.data['resolvedData'];

    if (resolvedData) {
      this.weighin = resolvedData['weighIn'];

      console.log('this.weighin');
      console.log(this.weighin);
    }
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
