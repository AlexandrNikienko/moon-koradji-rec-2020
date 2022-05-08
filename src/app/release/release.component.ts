import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

import { Artist } from '../core/models/artist.model';
import { Release } from '../core/models/release.model';
import { DataService } from '../core/services/data.service';

@Component({
	selector: 'app-release',
	templateUrl: './release.component.html',
	styleUrls: ['release.component.scss']
})

export class ReleaseComponent implements OnInit, OnDestroy {
	release: Release;
	involved: Artist[] = [];
	private releases$ = this.dataService.requestToData('releases');
	private artists$ = this.dataService.requestToData('artists');
	private releaseRoute = this.route.snapshot.params['releaseRoute'];
	private destroyStream = new Subject<void>();

	constructor(private route: ActivatedRoute,
		private dataService: DataService,
		private meta: Meta,
		private title: Title) {
	}

	ngOnInit() {
		this.releases$.pipe(
			switchMap(releases => {
				this.release = releases.find((release: Release) => release['releaseRoute'] === this.releaseRoute);
				return this.artists$;
			}),
			takeUntil(this.destroyStream)
		).subscribe(artists => {
			this.title.setTitle(this.release.releaseTitle);
			this.involved = this.getInvolvedArtists(artists, this.release.artists);
		})
	}

	ngOnDestroy() {
		this.destroyStream.next();
	}

	getInvolvedArtists(allArtists: Artist[], releaseArtists: string[]): Artist[] {
		let involved = [];
		releaseArtists.forEach(name => {
			const artist = allArtists.find(artist => artist.artistName === name);
			involved.push(artist);
		});
		return involved;
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
