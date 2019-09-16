import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReadingListComponent } from './reading/reading-list.component';

/*
const routes: Routes = [
  { path: 'test', component:  AppComponent },
  { path: '**', redirectTo: 'test', pathMatch: 'full' }
]; */

const routes: Routes = [
  { path: 'test', component:  AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
