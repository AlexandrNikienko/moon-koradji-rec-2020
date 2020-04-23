import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';

import {PODCASTS} from '../../../../environments/environment';
import {Podcast} from '../../models/podcast.model';

@Injectable()
export class PodcastsService {
    PODCASTS$ = this.http.get<Podcast[]>(PODCASTS.getItems)
        .pipe(
            map(obj => this.getPodcasts(obj)),
            shareReplay(1)
        );

    constructor(private http: HttpClient) {
    }

    getPodcasts(obj): Podcast[] {
        return obj.podcasts;
    }
}
