import { Artist } from './../core/models/artist.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

import { MetaDataService, iMeta } from './../core/services/meta-data.service';

import { HeadingComponent } from './../layout/heading/heading.component';
import { DataService } from '../core/services/data.service';
import { SafeHtmlPipe } from '../core/pipes/safe-html.pipe';
import { switchMap, takeUntil } from 'rxjs/operators';

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

	artist: Artist;
	private artistName: string;
	private destroyStream = new Subject<void>();

	ngOnInit(): void {
		this.route.paramMap.pipe(
			switchMap((params: ParamMap) => {
				this.artistName = params.get('artistRoute');
				return this.dataService.requestToData<Artist>('artists');
			}),
			takeUntil(this.destroyStream)
		)
		.subscribe(response => {
			this.artist = response.find((obj: Artist) => obj['artistRoute'] === this.artistName);

			if (!this.artist) {
				this.router.navigate(['/404'])
				return;
			}

			// this.setMetaData(this.artist);
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
