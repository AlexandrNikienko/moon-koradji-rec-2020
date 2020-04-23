import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';

import {RELEASES} from '../../../../environments/environment';
import {Release} from '../../models/release.model';

@Injectable()
export class DiscographyService {
    RELEASES$ = this.http.get<Release[]>(RELEASES.getItems)
        .pipe(
            map(obj => this.getReleases(obj)),
            shareReplay(1)
        );

    constructor(private http: HttpClient) { }

    getReleases(obj): Release[] {
        return obj.releases;
    }
}
