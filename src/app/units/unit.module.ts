import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { UnitEditComponent } from './unit-edit.component';
import { AuthGuard } from './../shared/auth.guard';

@NgModule({
  declarations: [
    UnitEditComponent
  ],
  imports: [
  	BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbDropdownModule,
    RouterModule.forChild([
      {
        path: 'units/edit',
        canActivate: [AuthGuard],
        component: UnitEditComponent
      }
    ])
  ]
})
export class UnitModule { }
