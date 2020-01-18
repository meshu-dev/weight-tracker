import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeighinListComponent } from './weighins/weighin-list.component';
import { NotFoundComponent } from './shared/not-found.component';

const routes: Routes = [
	{ path: '', redirectTo: '/weighins', pathMatch: 'full' },
	{ path: '404', component: WeighinListComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
