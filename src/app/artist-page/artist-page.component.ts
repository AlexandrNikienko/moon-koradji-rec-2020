import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';

import { Artist } from '../core/models/artist.model';
import { DataService } from '../core/services/data.service';

@Component({
	selector: 'app-artist-page',
	templateUrl: './artist-page.component.html'
})
export class ArtistPageComponent implements OnInit, OnDestroy {
	public artist: Artist;
	private artistRoute: string;
	private requestTo: string;
	private requestTo$: Observable<any>;
	private requestSubscription: Subscription;

	constructor(private route: ActivatedRoute,
		private dataService: DataService,
		private meta: Meta,
		private title: Title) {
	}

	ngOnInit() {
		this.artistRoute = this.route.snapshot.params['artistRoute'];
		this.requestTo = this.artistRoute.includes('dj-') ? 'djs' : 'artists';
		this.requestTo$ = this.dataService.requestToData(this.requestTo);

		this.requestSubscription = this.requestTo$.subscribe(artist => {
			this.artist = artist.filter((obj: Artist) => obj['artistRoute'] === this.artistRoute)[0];
			//this.setMetaData(this.artist);
			this.title.setTitle(this.artist.artistName);
		});
	}

	ngOnDestroy() {
		if (this.requestSubscription) {
			this.requestSubscription.unsubscribe();
		}
	}

	setMetaData(artist: Artist): void {
		this.meta.removeTag('property="og:title"');
		this.meta.removeTag('property="og:image"');
		this.meta.removeTag('property="og:url"');
		this.meta.removeTag('property="og:description"');

		let artistDesc = '';

		for (let i = 0; i < artist.artistDescription.length; i++) {
			artistDesc += artist.artistDescription[i].paragraph;
		}

		this.meta.addTags([
			{
				property: 'og:title',
				content: artist.artistName
			},
			{
				property: 'og:image',
				content: 'http://www.moonkoradji.com/assets/images/artists/' + artist.artistAvatar
			},
			{
				property: 'og:url',
				content: 'http://www.moonkoradji.com/artists/' + artist.artistRoute
			},
			{
				property: 'og:description',
				content: artistDesc
			}
		]);
	}
}
