import {Component, OnInit} from '@angular/core';

import {NewsService} from '../core/services/news.service';
import {DiscographyService} from '../core/services/discography.service';

import { Gallery } from '../core/models/gallery.model';

declare var window: any;

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
    public featuredArtists = ['Already Maged', 'Molchun', 'Inzect', 'Adansonia', 'Taigan Sunset', 'Traskel'];
    public featuredGalleryItems: Gallery[];
    public news$ = this.newsService.NEWS$;
    public releases$ = this.releasesService.RELEASES$;

    constructor(private newsService: NewsService,
                private releasesService: DiscographyService
                ) {}

    ngOnInit() {
        this.featuredGalleryItems = this.featuredArtists.map(artist => {
            return {
                name: artist,
                route: `/artists/${artist.replace(' ', '-').toLocaleLowerCase()}`,
                image: `/assets/images/artists/featured/featured_${artist.replace(' ', '_').toLocaleLowerCase()}.jpg`
            }
        })

        console.log(this.featuredGalleryItems);

        /* FB page widget */
        //window.FB.XFBML.parse();
        window.FB.init({
            appId      : '484153925308268',
            xfbml: true,
            version: 'v3.2'
        });
    }
}
