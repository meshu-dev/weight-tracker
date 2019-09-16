import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ReadingRepositoryService } from './reading-repository.service';
import { ReadingListComponent } from './reading-list.component';

import { ReadingRoutingModule } from './reading-routing.module';

@NgModule({
  imports: [
  	ReadingRoutingModule,
  	SharedModule
  ],
  exports: [],
  declarations: [
  	ReadingListComponent
  ],
  providers: [
  	ReadingRepositoryService
  ]
})
export class ReadingModule { };
