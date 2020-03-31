import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
// import {FacebookService, UIParams, UIResponse} from 'ngx-facebook';

import {Artist} from '../core/models/artist.model';
import {ArtistsService} from '../core/services/artists.service';
import {DjsService} from '../core/services/djs.service';

@Component({
    selector: 'app-artist-page',
    templateUrl: './artist-page.component.html'
})
export class ArtistPageComponent implements OnInit {
    public artists: Artist[];
    public artistRoute: string;
    public artist: Artist;
    public artists$ = this.artistsService.ARTISTS$;
    public djs$ = this.djsService.DJS$;

    constructor(private route: ActivatedRoute,
                private artistsService: ArtistsService,
                private djsService: DjsService,
                private meta: Meta,
                //private fb: FacebookService,
                private title: Title) {
    }

    ngOnInit() {
        this.artistRoute = this.route.snapshot.params['artistRoute'];

        if (this.artistRoute.includes('dj-')) {
            this.djs$
                .subscribe((djs) => {
                    this.artist = djs.filter(obj => obj['artistRoute'] === this.artistRoute)[0];
                    this.setMetaData(this.artist);
                    this.title.setTitle(this.artist.artistName);
                });
        } else {
            this.artists$
                .subscribe((artists) => {
                    this.artist = artists.filter(obj => obj['artistRoute'] === this.artistRoute)[0];
                    this.setMetaData(this.artist);
                    this.title.setTitle(this.artist.artistName);
                });
        }
    }

    setMetaData(artist) {
        this.meta.removeTag('property="og:title"');
        this.meta.removeTag('property="og:image"');
        this.meta.removeTag('property="og:url"');
        this.meta.removeTag('property="og:description"');

        let artistDesc = '';

        for (let i = 0; i < artist.artistDescription.length; i++) {
            artistDesc += artist.artistDescription[i].paragraph;
        }

        this.meta.addTags([
            {
                property: 'og:title',
                content: artist.artistName
            },
            {
                property: 'og:image',
                content: 'http://www.moonkoradji.com/assets/images/artists/' + artist.artistAvatar
            },
            {
                property: 'og:url',
                content: 'http://www.moonkoradji.com/artists/' + artist.artistRoute
            },
            {
                property: 'og:description',
                content: artistDesc
            }
        ]);

        // const artistName = this.meta.getTag('property="og:title"');
        // console.log(artistName.content);
        // const artistAvatar = this.meta.getTag('property="og:image"');
        // console.log(artistAvatar.content);
        // const artistLink = this.meta.getTag('property="og:url"');
        // console.log(artistLink.content);
        // const artistDescription = this.meta.getTag('property="og:description"');
        // console.log(artistDescription.content);
    }

    // share() {
    //     const params: UIParams = {
    //         href: document.URL,
    //         method: 'share',
    //     };
    //     this.fb.ui(params)
    //         .then((res: UIResponse) => console.log(res))
    //         .catch((e: any) => console.error(e));

    // }
}
