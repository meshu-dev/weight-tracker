import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ReadingRepositoryService } from './reading-repository.service';
import { ReadingComponent } from './reading.component';

@NgModule({
  imports: [ RouterModule, SharedModule ],
  exports: [ ],
  declarations: [ ReadingComponent ],
  providers: [ ReadingRepositoryService ]
})
export class ReadingModule { };
