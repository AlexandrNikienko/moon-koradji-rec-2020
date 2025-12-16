import { Artist } from './../core/models/artist.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, signal, computed, effect } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { MetaDataService, iMeta } from './../core/services/meta-data.service';

import { HeadingComponent } from './../layout/heading/heading.component';
import { DataService } from '../core/services/data.service';
import { SafeHtmlPipe } from '../core/pipes/safe-html.pipe';
import { map, switchMap, takeUntil } from 'rxjs/operators';

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
export class ArtistComponent implements OnInit, OnDestroy {
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private dataService = inject(DataService);
	private metaData = inject(MetaDataService);
	private destroyStream = new Subject<void>();

	artistRoute = toSignal(
		this.route.paramMap.pipe(map(params => params.get('artistRoute'))),
		{ initialValue: null }
	);

	allArtists = signal<Artist[]>([]);

	artist = computed<Artist>(() =>
		this.allArtists().find(a => a.artistRoute === this.artistRoute()) ?? null
	);

	ngOnInit(): void {
		this.dataService.requestToData<Artist>('artists')
			.pipe(takeUntil(this.destroyStream))
			.subscribe(data => this.allArtists.set(data));

		effect(() => {
			if (this.artist() === null && this.artistRoute() !== null) {
				this.router.navigate(['/404']);
				// this.setMetaData(this.artist());
			}
		});
	}

	ngOnDestroy(): void {
		this.destroyStream.next();
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
