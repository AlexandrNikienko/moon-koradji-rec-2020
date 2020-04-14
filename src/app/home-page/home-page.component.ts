import {Component, OnInit} from '@angular/core';

import {NewsService} from '../core/services/news.service';
import {DiscographyService} from '../core/services/discography.service';

declare var window: any;

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
    public news$ = this.newsService.NEWS$;

    public releases$ = this.releasesService.RELEASES$;

    constructor(private newsService: NewsService,
                private releasesService: DiscographyService
                ) {}

    ngOnInit() {
        /* FB page widget */
        //window.FB.XFBML.parse();
        window.FB.init({
            appId      : '484153925308268',
            xfbml: true,
            version: 'v3.2'
        });
    }
}
