import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { DATAFOLDER } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	existingParamsRoutes = ['artists', 'djs', 'releases'];
	existingPramas = new Subject<any[]>();

	constructor(
		private http: HttpClient,
		private router: Router
	) {
		this.getExistingParams();
	}

	requestToData(item: string): Observable<any> {
		const url = `${DATAFOLDER}${item}.json`;
		
		return this.http.get<any[]>(url)
			.pipe(
				map(object => object[item]),
				shareReplay(1)
			);
	}

	getExistingParams(): void {
		const existingParams = [];

		this.existingParamsRoutes.forEach(route => {
			const url = `${DATAFOLDER}${route}.json`;

			this.http.get<any[]>(url)
				.subscribe(object => {
					if (Object.keys(object)[0] === 'releases') {
						existingParams.push(object[route].map(obj => obj.releaseRoute))
					} else {
						existingParams.push(object[route].map(obj => obj.artistRoute))
					}
					
					if (existingParams.length > 0 && existingParams.length === this.existingParamsRoutes.length) {
						this.existingPramas.next(existingParams.flat());
					  }
				})
		});
	}

	checkIfRouteCorrect(route: string) {
		this.existingPramas.subscribe(items => {
			const resourceExists = !!items.find(item => item === route);

			if (!resourceExists) {
				this.router.navigate(['/404']);
			}
		});
	}
}
