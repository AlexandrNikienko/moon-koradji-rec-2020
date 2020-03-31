import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';

import {ARTISTS} from '../../../environments/environment';
import {Artist} from '../models/artist.model';

@Injectable()
export class ArtistsService {
    ARTISTS$ = this.http.get<Artist[]>(ARTISTS.getItems)
        .pipe(
            map(obj => this.getArtists(obj))
        );

    constructor(private http: HttpClient) {
    }

    getArtists(obj: any) {
        return obj.artists;
    }
}
