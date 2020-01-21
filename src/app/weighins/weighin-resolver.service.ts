import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { WeighinService } from './weighin.service';
import { IWeighin, WeighInResolved } from './weighin';

@Injectable({
	providedIn: 'root'
})
export class WeighinResolver implements Resolve<WeighInResolved> {
	constructor(private weighinService: WeighinService) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WeighInResolved> {
		const id = route.paramMap.get('id');

		if (isNaN(+id)) {
			console.log('Not a number');
			const message = `WeighIn id was not a number: ${id}`;
			return of({ weighIn: null, error: message });
		}
		return this.weighinService.get(+id)
			.pipe(
				map(weighIn => ({ weighIn: weighIn })),
				catchError(error => {
					const message = `Retrieval error: ${error}`;
					console.log(message);
					return of({ weighIn: null, error: message });
				})
			);
	}
}
