import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';

import {DJS} from '../../../../environments/environment';
import {Artist} from '../../models/artist.model';

@Injectable()
export class DjsService {
    DJS$ = this.http.get<Artist[]>(DJS.getItems)
        .pipe(
            map(obj => this.getDjs(obj)),
            shareReplay(1)
        );

    constructor(private http: HttpClient) {
    }

    getDjs(obj) {
        return obj.djs;
    }
}
