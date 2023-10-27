import { Component, QueryList, ViewChildren, AfterViewInit, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

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
		MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule
	],
	selector: 'app-artists',
	templateUrl: './artists.component.html',
	styleUrls: ['artists.scss']
})
export class ArtistsComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChildren('artist') artist: QueryList<Element>;

	private dataservice = inject(DataService);
	private metaData = inject(MetaDataService);

	artists: Artist[] = []
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

	countries = new FormControl('');
  	countryList: {artistCountry: string, flag: string}[] = [];
	choosenCountries: any = '';

	ngOnInit(): void {
		this.artists$ = this.dataservice.requestToData('artists');
		this.artists$.subscribe(artists => {
			const allArtists = artists;
			this.artists = allArtists;

			// Create an array of pairs (artistCountry, flag)
			const countryFlagPairs = artists.map(artist => ({ artistCountry: artist.artistCountry, flag: artist.flag }));
			// Create a set to remove duplicates
			const uniquePairsSet = new Set(countryFlagPairs.map(o => JSON.stringify(o)));
			// Convert the set back to an array
			const uniquePairs = Array.from(uniquePairsSet).map(o => JSON.parse(o));

			this.countryList = uniquePairs.sort((a, b) => a.artistCountry.localeCompare(b.artistCountry));

			this.countries.valueChanges.subscribe(countries => {
				this.choosenCountries = countries;
				this.artists = countries.length > 0 ? allArtists.filter(artist => countries.includes(artist.artistCountry)) : allArtists;

				setTimeout(e => {
					this.setAlphabeticalMarks();
				}, 0)
			})
		});

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
		document.querySelectorAll('.letter-separator').forEach(e => e.remove());
		
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
