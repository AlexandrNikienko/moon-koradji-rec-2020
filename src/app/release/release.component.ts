import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
	release: Release;
	involved: Artist[] = [];
	private releases$ = this.dataService.requestToData('releases');
	private artists$ = this.dataService.requestToData('artists');
	private releaseRoute = this.route.snapshot.params['releaseRoute'];
	private destroyStream = new Subject<void>();

	private metaDataObj: iMeta;

	constructor(
		private route: ActivatedRoute,
		private dataService: DataService,
		private metaData: MetaDataService,
		private router: Router
	) {
		// this.dataService.checkIfRouteCorrect(this.releaseRoute);
	}

	ngOnInit() {
		this.releases$.pipe(
			switchMap(releases => {
				this.release = releases.find((release: Release) => release['releaseRoute'] === this.releaseRoute);
				return this.artists$;
			}),
			takeUntil(this.destroyStream)
		).subscribe(artists => {
			this.involved = this.getInvolvedArtists(artists, this.release.artists);

			let releaseDesc = '';

			for (let i = 0; i < this.release.releaseDescription.length; i++) {
				releaseDesc += this.release.releaseDescription[i].paragraph;
			}

			this.metaDataObj = {
				title: `${this.release.releaseTitle} | Moon Koradji Records`,
				description: releaseDesc,
				ogTitle: this.release.releaseTitle,
				ogImage: 'https://www.moonkoradji.com/assets/images/release-cover/' + this.release.releaseCover.default,
				ogUrl: 'https://www.moonkoradji.com/releases/' + this.release.releaseRoute,
				ogDescription: releaseDesc
			}

			this.metaData.setMetaData(this.metaDataObj);
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

	shareOnFacebook(): void {
		window.open('https://www.facebook.com/sharer.php?u=' + encodeURIComponent('https://www.moonkoradji.com/releases/' + this.release.releaseRoute), '_blank');
	  }
}
