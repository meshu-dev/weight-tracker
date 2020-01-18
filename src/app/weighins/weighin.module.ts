import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { WeighinListComponent } from './weighin-list.component';
import { WeighinEditComponent } from './weighin-edit.component';
import { AuthGuard } from './../shared/auth.guard';

@NgModule({
  declarations: [
    WeighinListComponent,
    WeighinEditComponent
  ],
  imports: [
  	BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    RouterModule.forChild([
      {
        path: 'weighins',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: WeighinListComponent
          },
          {
            path: 'add',
            component: WeighinEditComponent
          },
          {
            path: ':id/edit',
            component: WeighinEditComponent
          }
        ]
      }
    ])
  ]
})
export class WeighinModule { }
