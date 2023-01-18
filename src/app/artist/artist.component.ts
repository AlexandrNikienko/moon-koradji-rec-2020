import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';

import { Artist } from '../core/models/artist.model';
import { DataService } from '../core/services/data.service';

@Component({
	selector: 'app-artist',
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

	constructor(private route: ActivatedRoute,
		private dataService: DataService,
		private meta: Meta,
		private title: Title) {
	}

	ngOnInit(): void {
		this.routeSub = this.route.paramMap.subscribe(params => {
			this.artistName = params.get('artistRoute');
			this.requestTo = this.artistName.includes('dj-') ? 'djs' : 'artists';
			this.requestTo$ = this.dataService.requestToData(this.requestTo);

			this.requestSub = this.requestTo$.subscribe(response => {
				this.artist = response.find((obj: Artist) => obj['artistRoute'] === this.artistName);
				this.setMetaData(this.artist);
				this.title.setTitle(this.artist.artistName);
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

	// TODO
	setMetaData(artist: Artist): void {
		console.log('setMetaData')
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
