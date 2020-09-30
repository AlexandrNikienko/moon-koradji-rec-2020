import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

import { Artist } from '../core/models/artist.model';
import { Release } from '../core/models/release.model';
import { DataService } from '../core/services/data.service';

import { IMAGEFOLDER } from '../../environments/environment';

@Component({
	selector: 'app-release-page',
	templateUrl: './release-page.component.html'
})
export class ReleasePageComponent implements OnInit {
	public coverFolder = IMAGEFOLDER + 'release-cover/';
	public releases$ = this.dataService.requestToData('releases');
	public artists$ = this.dataService.requestToData('artists');
	public releaseRoute: string;
	public release: Release;
	public releaseArtists: Array<string>;
	public involved: Artist[] = [];
	private releasesSub: Subscription;
	private joinSub: Subscription;

	constructor(private route: ActivatedRoute,
		private dataService: DataService,
		private meta: Meta,
		private title: Title) {
	}

	ngOnInit() {
		this.releaseRoute = this.route.snapshot.params['releaseRoute'];

		this.releases$
			.subscribe(releases => {
				this.release = releases.filter(obj => obj['releaseRoute'] === this.releaseRoute)[0];
				this.releaseArtists = this.release.artists;
				//this.setMetaData(this.release);
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

	ngOnDestroy(): void {
		if (this.releasesSub) {
			this.releasesSub.unsubscribe();
		}
		if (this.joinSub) {
			this.joinSub.unsubscribe();
		}
	}

	createInvolvedArtistsArray(allArtists: Artist[], releaseArtists: string[]): void {
		const self = this;
		releaseArtists.forEach((name) => {
			const artist = allArtists.filter(arr => arr.artistName === name);
			self.involved.push(artist[0]);
		});
	}

	setMetaData(release: Release): void {
		this.meta.removeTag('property="og:title"');
		this.meta.removeTag('property="og:image"');
		this.meta.removeTag('property="og:url"');
		this.meta.removeTag('property="og:description"');

		let releaseDesc = '';

		for (let i = 0; i < release.releaseDescription.length; i++) {
			releaseDesc += release.releaseDescription[i].paragraph;
		}

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
	}
}
