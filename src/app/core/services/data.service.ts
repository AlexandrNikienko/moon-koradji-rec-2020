import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { DATAFOLDER } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private http = inject(HttpClient);
	private cache: { [key: string]: Observable<any> } = {};

	requestToData<T>(item: string): Observable<T[]> {
		// Return cached observable if it exists
		if (this.cache[item]) {
			return this.cache[item] as Observable<T[]>;
		}

		const url = `${DATAFOLDER}${item}.json`;

		const request$ = this.http.get<{ [key: string]: T[] }>(url).pipe(
			map(object => object[item]),
			shareReplay(1)
		);

		// Store observable in cache
		this.cache[item] = request$;
		return request$;
	}

	// Optional: Clear cache manually (if needed)
	// clearCache(item?: string) {
	// 	if (item) {
	// 		delete this.cache[item];
	// 	} else {
	// 		this.cache = {};
	// 	}
	// }
}
