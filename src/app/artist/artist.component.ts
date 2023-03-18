import { HeadingComponent } from './../layout/heading/heading.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from './../core/pipes/pipes.module';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Artist } from '../core/models/artist.model';
import { DataService } from '../core/services/data.service';
import { SafeHtmlPipe } from '../core/pipes/safe-html.pipe';

@Component({
	standalone: true,
	imports: [HeadingComponent, PipesModule, CommonModule, RouterModule],
	templateUrl: 'artist.component.html',
	styleUrls: ['artist.component.scss']
})
export class ArtistComponent implements OnInit, OnDestroy {
	public artist: Artist;
	private artistName: string;
	private requestTo: string;
	private requestTo$: Observable<any>;
	private routeSub: Subscription;
	private requestSub: Subscription;

	private metaDataObj: iMeta;

	constructor(
		private route: ActivatedRoute,
		private dataService: DataService,
		private metaData: MetaDataService
	) {}

	ngOnInit(): void {
		this.routeSub = this.route.paramMap.subscribe(params => {
			this.artistName = params.get('artistRoute');
			this.requestTo = this.artistName.includes('dj-') ? 'djs' : 'artists';
			this.requestTo$ = this.dataService.requestToData(this.requestTo);

			this.requestSub = this.requestTo$.subscribe(response => {
				this.artist = response.find((obj: Artist) => obj['artistRoute'] === this.artistName);

				let artistDesc = '';

				for (let i = 0; i < this.artist.artistDescription.length; i++) {
					artistDesc += this.artist.artistDescription[i].paragraph;
				}

				this.metaDataObj = {
					title: `${this.artist.artistName} | Moon Koradji Records`,
					description: artistDesc,
					ogTitle: this.artist.artistName,
					ogImage: 'https://www.moonkoradji.com/assets/images/release-cover/' + this.artist.artistAvatar,
					ogUrl: 'https://www.moonkoradji.com/artists/' + this.artist.artistRoute,
					ogDescription: artistDesc
				}

				this.metaData.setMetaData(this.metaDataObj);
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
}
