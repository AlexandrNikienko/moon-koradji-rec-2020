import { Component, QueryList, ViewChildren, AfterViewInit } from '@angular/core';

import { DataService } from '../core/services/data.service';

@Component({
	selector: 'app-artists-page',
	templateUrl: './artists-page.component.html'
})
export class ArtistsPageComponent implements AfterViewInit {
	@ViewChildren('artistCell') artistCell: QueryList<any>;
	public artists$ = this.dataservice.requestToData('artists');
	public djs$ = this.dataservice.requestToData('djs');

	constructor(private dataservice: DataService) { }

	ngAfterViewInit() {
		this.artistCell.changes.subscribe(t => {
			this.setAlphabeticalMarks();
		});
	}

	setAlphabeticalMarks() {
		let startLetter = '',
			firstLetter = '';
		const artistName = document.querySelectorAll('.js-artist-name');

		for (let i = 0; i < artistName.length; i++) {
			firstLetter = artistName[i].textContent.charAt(0);
			if (firstLetter > startLetter) {
				artistName[i].insertAdjacentHTML('afterend', `<div class="s-letter-separator">${firstLetter}</div>`);
				startLetter = firstLetter;
			}
		}
	}
}
