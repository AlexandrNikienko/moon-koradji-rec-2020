import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { DataService } from '../core/services/data.service';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';

import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { PictureComponent } from './../shared/picture/picture.component';
import { SharedVideoComponent } from './../shared/video/video.component';
import { HeadingComponent } from './../layout/heading/heading.component';
import { Artist } from '../core/models/artist.model';
import { Release } from '../core/models/release.model';
import { ReleaseCardComponent } from '../shared/release-card/release-card.component';

@Component({
	selector: 'app-release',
	imports: [
		CommonModule,
		RouterModule,
		HeadingComponent,
		AudioPlayerComponent,
		SharedVideoComponent,
		PictureComponent,
		ReleaseCardComponent
	],
	templateUrl: './release.component.html',
	styleUrls: ['release.component.scss']
})

export class ReleaseComponent implements OnInit {
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private dataService = inject(DataService);
	private metaData = inject(MetaDataService);
	private destroyRef = inject(DestroyRef);

	private metaDataObj: iMeta;

	releaseRoute = toSignal(
		this.route.paramMap.pipe(map(params => params.get('releaseRoute'))),
		{ initialValue: null }
	);

	allReleases = signal<Release[]>([]);
	allArtists = signal<Artist[]>([]);

	releaseIndex = computed<number>(() =>
		this.allReleases().findIndex(r => r.releaseRoute === this.releaseRoute())
	);

	release = computed<Release | null>(() =>
		this.releaseIndex() >= 0 ? this.allReleases()[this.releaseIndex()] : null
	);

	nextRelease = computed<Release | null>(() => {
		const i = this.releaseIndex();
		return i > 0 ? this.allReleases()[i - 1] : null;
	});

	previousRelease = computed<Release | null>(() => {
		const i = this.releaseIndex();
		return i >= 0 && i < this.allReleases().length - 1 ? this.allReleases()[i + 1] : null;
	});

	involvedArtists = computed<Artist[]>(() => {
		const release = this.release();
		if (!release) return [];

		return this.allArtists().filter(a => release.artists.includes(a.artistName));
	});

	private releaseEffect = effect(() => {
		if (
			this.allReleases().length > 0 &&
			this.releaseRoute() &&
			!this.release()
		) {
			this.router.navigate(['/404']);
		}

		// if (this.release()) {
		// 	this.setMetaData(this.release()!);
		// }
	});

	ngOnInit(): void {
		this.dataService
			.requestToData<Release>('releases')
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(data => this.allReleases.set(data));

		this.dataService
			.requestToData<Artist>('artists')
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(data => this.allArtists.set(data));
	}

	shareOnFacebook(): void {
		window.open('https://www.facebook.com/sharer.php?u=' + encodeURIComponent('https://www.moonkoradji.com/releases/' + this.release().releaseRoute), '_blank');
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
