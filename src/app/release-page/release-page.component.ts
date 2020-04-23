import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
// import {FacebookService, UIParams, UIResponse} from 'ngx-facebook';

import { Artist } from '../core/models/artist.model';
import { Release } from '../core/models/release.model';
import { DataService } from '../core/services/data.service';

@Component({
    selector: 'app-release-page',
    templateUrl: './release-page.component.html'
})
export class ReleasePageComponent implements OnInit {
    public releases$ = this.dataService.requestToData('releases');
    public artists$ = this.dataService.requestToData('artists');
    public releaseRoute: string;
    public release: Release;
    public releaseArtists: Array<string>;
    public involved: Artist[] = [];

    constructor(private route: ActivatedRoute,
        private dataService: DataService,
        private meta: Meta,
        // private fb: FacebookService,
        private title: Title) {
    }

    ngOnInit() {
        this.releaseRoute = this.route.snapshot.params['releaseRoute'];

        this.releases$
            .subscribe(releases => {
                this.release = releases.filter(obj => obj['releaseRoute'] === this.releaseRoute)[0];
                this.releaseArtists = this.release.artists;
                this.setMetaData(this.release);
                this.title.setTitle(this.release.releaseTitle);
            });

        forkJoin(this.artists$, this.releases$)
            .subscribe(
                data => {
                    const allArtistsList = data[0];
                    this.createInvolvedArtistsArray(allArtistsList, this.releaseArtists);
                }
            );
    }

    createInvolvedArtistsArray(allArtists, releaseArtists): void {
        const self = this;
        releaseArtists.forEach((name) => {
            const artist = allArtists.filter(arr => arr.artistName === name);
            self.involved.push(artist[0]);
        });
    }

    setMetaData(release) {
        // document.title = release.releaseTitle;

        this.meta.removeTag('property="og:title"');
        this.meta.removeTag('property="og:image"');
        this.meta.removeTag('property="og:url"');
        this.meta.removeTag('property="og:description"');

        let releaseDesc = '';

        for (let i = 0; i < release.releaseDescription.length; i++) {
            releaseDesc += release.releaseDescription[i].paragraph;
        }

        // document.querySelector('meta[name="description"]').setAttribute('content', releaseDesc);

        this.meta.addTags([
            {
                property: 'og:title',
                content: release.releaseTitle
            },
            {
                property: 'og:image',
                content: 'http://www.moonkoradji.com/assets/images/release-cover/' + release.releaseCover
            },
            {
                property: 'og:url',
                content: 'http://www.moonkoradji.com/releases/' + release.releaseRoute
            },
            {
                property: 'og:description',
                content: releaseDesc
            }
        ]);

        this.meta.getTag('property="og:title"');
        this.meta.getTag('property="og:image"');
        this.meta.getTag('property="og:url"');
        this.meta.getTag('property="og:description"');
    }

    share() {
        // const params: UIParams = {
        //     link: 'http://www.moonkoradji.com/assets/images/release-cover/' + this.release.releaseCover,
        //     picture: 'http://www.moonkoradji.com/assets/images/release-cover/' + this.release.releaseCover,
        //     method: 'feed',
        //     display: 'dialog'
        // };

        // this.fb.ui(params)
        //     .then((res: UIResponse) => console.log(res))
        //     .catch((e: any) => console.error(e));

    }
}
