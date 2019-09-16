import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRepositoryService } from './user-repository.service';

import { NavBarComponent } from './nav-bar.component';

@NgModule({
  imports: [
  	CommonModule
  ],
  exports: [
  	NavBarComponent
  ],
  declarations: [
  	NavBarComponent
  ],
  providers: [
  	UserRepositoryService
  ]
})
export class CoreModule { };
