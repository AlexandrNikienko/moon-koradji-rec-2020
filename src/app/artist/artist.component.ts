import { Artist } from './../core/models/artist.model';
import { CommonModule } from '@angular/common';
import { Component, inject, computed, effect, DestroyRef, Signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { MetaDataService, iMeta } from './../core/services/meta-data.service';

import { HeadingComponent } from './../layout/heading/heading.component';
import { SafeHtmlPipe } from '../core/pipes/safe-html.pipe';
import { map } from 'rxjs/operators';
import { DataSignalService } from '../core/services/data-signal';

@Component({
    imports: [
        HeadingComponent,
        SafeHtmlPipe,
        CommonModule,
        RouterModule
    ],
    templateUrl: 'artist.component.html',
    styleUrls: ['artist.component.scss']
})
export class ArtistComponent {
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private dataSignalService = inject(DataSignalService);
	private metaData = inject(MetaDataService);

	artistRoute = toSignal(
		this.route.paramMap.pipe(map(params => params.get('artistRoute'))),
		{ initialValue: null }
	);

	allArtists: Signal<Artist[]> = this.dataSignalService.getData<Artist>('artists');

	artist = computed<Artist | null>(() =>
		this.allArtists().find(a => a.artistRoute === this.artistRoute()) ?? null
	);

	constructor() {
		effect(() => {
			if (
				this.allArtists().length > 0 && 
				!this.artist() && 
				this.artistRoute()
			) {
				this.router.navigate(['/404']);
			}

			// if (this.artist()) {
				// 	this.setMetaData(this.artist());
			// }
		});
	}

	setMetaData(artist: Artist): void {
		const artistDesc = artist.artistDescription.reduce((desc, par) => desc + par.paragraph, '');		

		const metaDataObj: iMeta = {
			title: `${artist.artistName} | Moon Koradji Records`,
			description: artistDesc,
			ogTitle: artist.artistName,
			ogImage: 'https://www.moonkoradji.com/assets/images/release-cover/' + artist.artistAvatar,
			ogUrl: 'https://www.moonkoradji.com/artists/' + artist.artistRoute,
			ogDescription: artistDesc
		}

		this.metaData.setMetaData(metaDataObj);
	}
}
