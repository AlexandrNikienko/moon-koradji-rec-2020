import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';

import { Gallery } from '../core/models/gallery.model';

declare var window: any;

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
    public featuredArtists = ['Already Maged', 'Molchun', 'Inzect', 'Adansonia', 'Taigan Sunset', 'Traskel'];
    public featuredGalleryItems: Gallery[];

    public _news$ = this.dataService.requestToData('news');;
    public _releases$ = this.dataService.requestToData('releases');

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.featuredGalleryItems = this.featuredArtists.map(artist => {
            return {
                name: artist,
                route: `/artists/${artist.replace(' ', '-').toLocaleLowerCase()}`,
                image: `/assets/images/artists/featured/featured_${artist.replace(' ', '_').toLocaleLowerCase()}.jpg`
            }
        })

        /* FB page widget */
        //window.FB.XFBML.parse();
        window.FB.init({
            appId: '484153925308268',
            xfbml: true,
            version: 'v3.2'
        });
    }
}
