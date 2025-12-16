import { Artist } from './../core/models/artist.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, computed, effect, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { MetaDataService, iMeta } from './../core/services/meta-data.service';

import { HeadingComponent } from './../layout/heading/heading.component';
import { DataService } from '../core/services/data.service';
import { SafeHtmlPipe } from '../core/pipes/safe-html.pipe';
import { map } from 'rxjs/operators';

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
export class ArtistComponent implements OnInit {
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private dataService = inject(DataService);
	private metaData = inject(MetaDataService);
	private destroyRef = inject(DestroyRef);

	artistRoute = toSignal(
		this.route.paramMap.pipe(map(params => params.get('artistRoute'))),
		{ initialValue: null }
	);

	allArtists = signal<Artist[]>([]);

	artist = computed<Artist | null>(() =>
		this.allArtists().find(a => a.artistRoute === this.artistRoute()) ?? null
	);

	private artistEffect = effect(() => {
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

	ngOnInit(): void {
		this.dataService.requestToData<Artist>('artists')
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(data => this.allArtists.set(data));
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
