import { Subscription } from 'rxjs';
import { Component, QueryList, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';

import { DataService } from '../core/services/data.service';

@Component({
	selector: 'app-artists',
	templateUrl: './artists.component.html',
	styleUrls: ['artists.scss']
})
export class ArtistsComponent implements AfterViewInit, OnDestroy {
	@ViewChildren('artist') artist: QueryList<Element>;

	public artists$ = this.dataservice.requestToData('artists');
	public djs$ = this.dataservice.requestToData('djs');
	private changesSub: Subscription;

	constructor(private dataservice: DataService) { }

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
