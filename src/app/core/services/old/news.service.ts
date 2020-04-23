import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';

import {NEWS} from '../../../../environments/environment';
import {News} from '../../models/news.model';

@Injectable()
export class NewsService {
    NEWS$ = this.http.get<News[]>(NEWS.getItems)
        .pipe(
            map(obj => this.getNews(obj)),
            shareReplay(1)
        );

    constructor(private http: HttpClient) { }

    getNews(obj): News[] {
        return obj.news;
    }
}
