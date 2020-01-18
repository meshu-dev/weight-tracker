import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { WeighinListComponent } from './weighin-list.component';

@NgModule({
  declarations: [
    WeighinListComponent
  ],
  imports: [
  	BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'weighins',
        children: [
          {
            path: '',
            component: WeighinListComponent
          }
        ]
      }
    ])
  ]
})
export class WeighinModule { }
