import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { NotFoundComponent } from './not-found.component';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    NgbAlertModule
  ],
  exports: [
    NotificationsComponent
  ]
})
export class SharedModule { }
