import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { DATAFOLDER } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private http = inject(HttpClient);

	requestToData<T>(item: string): Observable<T[]> {
		const url = `${DATAFOLDER}${item}.json`;
		
		return this.http.get<T[]>(url)
			.pipe(
				map(object => object[item]),
				shareReplay(1)
			);
	}
}
