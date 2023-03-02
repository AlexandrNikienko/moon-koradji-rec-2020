import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { Subscription } from 'rxjs';
import { Component, QueryList, ViewChildren, AfterViewInit, OnDestroy, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';

@Component({
	selector: 'app-artists',
	templateUrl: './artists.component.html',
	styleUrls: ['artists.scss']
})
export class ArtistsComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChildren('artist') artist: QueryList<Element>;

	public artists$ = this.dataservice.requestToData('artists');
	public djs$ = this.dataservice.requestToData('djs');
	private changesSub: Subscription;

	constructor(
		private dataservice: DataService,
		private metaData: MetaDataService
	) {}

	ngOnInit(): void {
		const metaDataObj: iMeta = {
			title: 'Innovative Sounds of Psychedelic Trance: Meet Our Talented Artists and DJs',
			description: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. dj Omsun.',
			ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
			ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
			ogUrl: 'https://www.moonkoradji.com/artists',
			ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. dj Omsun.'
		}

		this.metaData.setMetaData(metaDataObj);
	}

	ngAfterViewInit(): void {
		this.changesSub = this.artist.changes.subscribe(t => {
			this.setAlphabeticalMarks();
		});

	}

	ngOnDestroy(): void {
		if (this.changesSub) {
			this.changesSub.unsubscribe();
		}
	}

	setAlphabeticalMarks(): void {
		let startLetter = '';
		let firstLetter = '';
		const artistNames = document.querySelectorAll('.js-artist-name');

		for (let i = 0; i < artistNames.length; i++) {
			firstLetter = artistNames[i].textContent.charAt(0);
			if (firstLetter > startLetter) {
				artistNames[i].insertAdjacentHTML('afterend', `<div class="letter-separator">${firstLetter}</div>`);
				startLetter = firstLetter;
			}
		}
	}
}
