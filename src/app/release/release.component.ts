import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { DataService } from '../core/services/data.service';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { PipesModule } from './../core/pipes/pipes.module';

import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { PictureComponent } from './../shared/picture/picture.component';
import { SharedVideoComponent } from './../shared/video/video.component';
import { HeadingComponent } from './../layout/heading/heading.component';
import { Artist } from '../core/models/artist.model';
import { Release } from '../core/models/release.model';

@Component({
	standalone: true,
	selector: 'app-release',
	imports: [
		CommonModule,
		RouterModule,
		PipesModule,
		HeadingComponent,
		AudioPlayerComponent,
		SharedVideoComponent,
		PictureComponent
	],
	templateUrl: './release.component.html',
	styleUrls: ['release.component.scss']
})

export class ReleaseComponent implements OnInit, OnDestroy {
	private route = inject(ActivatedRoute);
	private dataService = inject(DataService);
	private metaData = inject(MetaDataService);

	release: Release;
	involved: Artist[] = [];
	private releases$ = this.dataService.requestToData<Release>('releases');
	private artists$ = this.dataService.requestToData<Artist>('artists');
	private releaseRoute = this.route.snapshot.params['releaseRoute'];
	private destroyStream = new Subject<void>();

	private metaDataObj: iMeta;

	ngOnInit() {
		this.releases$.pipe(
			switchMap(releases => {
				this.release = releases.find((release: Release) => release['releaseRoute'] === this.releaseRoute);

				this.setMetaData(this.release);

				return this.artists$;
			}),
			takeUntil(this.destroyStream)
		).subscribe(artists => {
			this.involved = this.getInvolvedArtists(artists, this.release.artists);
		})
	}

	ngOnDestroy() {
		this.destroyStream.next();
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
