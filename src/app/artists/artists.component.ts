import { Component, QueryList, ViewChildren, AfterViewInit, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PipesModule } from './../core/pipes/pipes.module';
import { DataService } from '../core/services/data.service';

import { HeadingComponent } from './../layout/heading/heading.component';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { Observable, Subscription } from 'rxjs';
import { Artist } from '../core/models/artist.model';

@Component({
	standalone: true,
	imports: [
		HeadingComponent,
		CommonModule,
		RouterModule,
		PipesModule
	],
	selector: 'app-artists',
	templateUrl: './artists.component.html',
	styleUrls: ['artists.scss']
})
export class ArtistsComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChildren('artist') artist: QueryList<Element>;

	private dataservice = inject(DataService);
	private metaData = inject(MetaDataService);

	public artists$: Observable<Artist[]>;
	public djs$: Observable<Artist[]>;
	private changesSub: Subscription;

	private metaDataObj: iMeta = {
		title: 'Innovative Sounds of Psychedelic Trance: Meet Our Talented Artists and DJs',
		description: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko aka DJ Omsun.',
		ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
		ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
		ogUrl: 'https://www.moonkoradji.com/artists',
		ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko aka DJ Omsun.'
	}

	ngOnInit(): void {
		this.artists$ = this.dataservice.requestToData('artists');
		this.djs$ = this.dataservice.requestToData('djs');
		this.metaData.setMetaData(this.metaDataObj);
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

	// TODO
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
