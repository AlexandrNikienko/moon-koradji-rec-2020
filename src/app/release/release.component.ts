import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Route, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, tap } from 'rxjs/operators';

import { DataService } from '../core/services/data.service';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';

import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { PictureComponent } from './../shared/picture/picture.component';
import { SharedVideoComponent } from './../shared/video/video.component';
import { HeadingComponent } from './../layout/heading/heading.component';
import { Artist } from '../core/models/artist.model';
import { Release } from '../core/models/release.model';
import { SafeHtmlPipe } from '../core/pipes/safe-html.pipe';
import { ReleaseCardComponent } from '../shared/release-card/release-card.component';

@Component({
	standalone: true,
	selector: 'app-release',
	imports: [
		CommonModule,
		RouterModule,
		SafeHtmlPipe,
		HeadingComponent,
		AudioPlayerComponent,
		SharedVideoComponent,
		PictureComponent,
		ReleaseCardComponent
	],
	templateUrl: './release.component.html',
	styleUrls: ['release.component.scss']
})

export class ReleaseComponent implements OnInit, OnDestroy {
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private dataService = inject(DataService);
	private metaData = inject(MetaDataService);
	private viewportScroller = inject(ViewportScroller);

	release: Release;
	nextRelease: Release;
	previousRelease: Release;
	involved: Artist[] = [];
	private releases$ = this.dataService.requestToData<Release>('releases');
	private artists$ = this.dataService.requestToData<Artist>('artists');
	private releaseRoute = this.route.snapshot.params['releaseRoute'];
	private destroyStream = new Subject<void>();

	private metaDataObj: iMeta;

	ngOnInit() {
		this.fetchReleaseData(this.releaseRoute);

		this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => {
					const releaseRoute = params.get('releaseRoute');
					this.fetchReleaseData(releaseRoute);
					return this.router.events;
				}),
				takeUntil(this.destroyStream)
			)
			.subscribe((event) => {
				if (event instanceof NavigationEnd) {
					this.scrollToTop();
				}
			});
	}

	ngOnDestroy() {
		this.destroyStream.next();
	}

	scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	fetchReleaseData(releaseRoute: string): void {
		this.releases$.pipe(
			switchMap(releases => {
				const releaseIndex = releases.findIndex((release: Release) => release['releaseRoute'] === releaseRoute);
				this.release = releases[releaseIndex];
				this.nextRelease = releaseIndex === 0 ? null : releases[releaseIndex - 1];
				this.previousRelease = releaseIndex === releases.length ? null : releases[releaseIndex + 1];

				this.setMetaData(this.release);

				return this.artists$;
			}),
			takeUntil(this.destroyStream)
		).subscribe(artists => {
			this.involved = this.getInvolvedArtists(artists, this.release.artists);
		})
	}

	getInvolvedArtists(allArtists: Artist[], releaseArtists: string[]): Artist[] {
		return allArtists.filter(artist => releaseArtists.includes(artist.artistName));
	}

	shareOnFacebook(): void {
		window.open('https://www.facebook.com/sharer.php?u=' + encodeURIComponent('https://www.moonkoradji.com/releases/' + this.release.releaseRoute), '_blank');
	}

	setMetaData(release: Release): void {
		const releaseDesc = release.releaseDescription.reduce((desc, par) => desc + par.paragraph, '');

		this.metaDataObj = {
			title: `${release.releaseTitle} | Moon Koradji Records`,
			description: releaseDesc,
			ogTitle: release.releaseTitle,
			ogImage: 'https://www.moonkoradji.com/assets/images/release-cover/' + release.releaseCover.default,
			ogUrl: 'https://www.moonkoradji.com/releases/' + release.releaseRoute,
			ogDescription: releaseDesc
		}

		this.metaData.setMetaData(this.metaDataObj);
	}
}
