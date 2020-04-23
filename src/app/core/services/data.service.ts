import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { DATAFOLDER } from '../../../environments/environment';


@Injectable()
export class DataService {
    // _ARTISTS$ = this.requestToData('artists');
    // _DJ$ = this.requestToData('djs');
    // _NEWS$ = this.requestToData('news');
    // _PODCASTS$ = this.requestToData('podcasts');
    // _RELEASES$ = this.requestToData('releases');
    // etc

    constructor(private http: HttpClient) { }

    requestToData(item: string): Observable<any> {
        return this.http.get<any[]>(`${DATAFOLDER}${item}.json`)
            .pipe(
                map(object => object[item]),
                shareReplay(1)
            );
    }
}
