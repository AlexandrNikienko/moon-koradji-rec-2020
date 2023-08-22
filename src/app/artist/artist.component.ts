import { Artist } from './../core/models/artist.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { PipesModule } from './../core/pipes/pipes.module';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';

import { HeadingComponent } from './../layout/heading/heading.component';
import { DataService } from '../core/services/data.service';

@Component({
	standalone: true,
	imports: [
		HeadingComponent,
		PipesModule,
		CommonModule, 
		RouterModule
	],
	templateUrl: 'artist.component.html',
	styleUrls: ['artist.component.scss']
})
export class ArtistComponent implements OnInit, OnDestroy {
	private route = inject(ActivatedRoute);
	private dataService = inject(DataService);
	private metaData = inject(MetaDataService);

	public artist: Artist;
	private artistName: string;
	private requestTo: string;
	private requestTo$: Observable<Artist[]>;
	private routeSub: Subscription;
	private requestSub: Subscription;
	private metaDataObj: iMeta;

	ngOnInit(): void {
		this.routeSub = this.route.paramMap.subscribe(params => {
			this.artistName = params.get('artistRoute');
			// this.dataService.checkIfRouteCorrect(this.artistName);
			this.requestTo = this.artistName.includes('dj-') ? 'djs' : 'artists';
			this.requestTo$ = this.dataService.requestToData<Artist>(this.requestTo);

			this.requestSub = this.requestTo$.subscribe(response => {
				this.artist = response.find((obj: Artist) => obj['artistRoute'] === this.artistName);

				this.setMetaData(this.artist);
			});
		})
	}

	ngOnDestroy(): void {
		if (this.routeSub) {
			this.routeSub.unsubscribe();
		}
		if (this.requestSub) {
			this.requestSub.unsubscribe();
		}
	}

	setMetaData(artist: Artist): void {
		const artistDesc = artist.artistDescription.reduce((desc, par) => desc + par.paragraph, '');		

		this.metaDataObj = {
			title: `${artist.artistName} | Moon Koradji Records`,
			description: artistDesc,
			ogTitle: artist.artistName,
			ogImage: 'https://www.moonkoradji.com/assets/images/release-cover/' + artist.artistAvatar,
			ogUrl: 'https://www.moonkoradji.com/artists/' + artist.artistRoute,
			ogDescription: artistDesc
		}

		this.metaData.setMetaData(this.metaDataObj);
	}
}
