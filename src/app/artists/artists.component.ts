import { Component, QueryList, ViewChildren, AfterViewInit, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

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
		MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatSlideToggleModule
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
	private allArtists: Artist[] = [];
	isFeaturedChecked = false;
	artists$: Observable<Artist[]>;
	djs$: Observable<Artist[]>;
	djs: Artist[] = [];
	private allDjs: Artist[] = [];
	private filteredByCountryDjs: Artist[] = [];
	private featuredDjs: Artist[] = [];

	private changesSub: Subscription;

	private metaDataObj: iMeta = {
		title: 'Innovative Sounds of Psychedelic Trance: Meet Our Talented Artists and DJs',
		description: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.',
		ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
		ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
		ogUrl: 'https://www.moonkoradji.com/artists',
		ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.'
	}

	countries = new FormControl('');
  	countryList: {artistCountry: string, flag: string}[] = [];
	choosenCountries: any = '';

	ngOnInit(): void {
		this.artists$ = this.dataservice.requestToData('artists');
		this.artists$.subscribe(artists => {
			this.allArtists = artists;
			this.artists = this.allArtists;

			// Create an array of pairs (artistCountry, flag)
			const countryFlagPairs = artists.map(artist => ({ artistCountry: artist.artistCountry, flag: artist.flag }));
			// Create a set to remove duplicates
			const uniquePairsSet = new Set(countryFlagPairs.map(o => JSON.stringify(o)));
			// Convert the set back to an array
			const uniquePairs = Array.from(uniquePairsSet).map(o => JSON.parse(o));

			this.countryList = uniquePairs.sort((a, b) => a.artistCountry.localeCompare(b.artistCountry));

			this.countries.valueChanges.subscribe(countries => {
				this.choosenCountries = countries;
				this.filterArtists();

				setTimeout(e => {
					this.setAlphabeticalMarks();
				}, 0)
			})
		});

		this.djs$ = this.dataservice.requestToData('djs');
		this.djs$.subscribe(djs => {
			this.allDjs = djs;
			this.djs = this.allDjs;
			//this.featuredDjs = this.allDjs.filter(dj => dj.featured);
		});

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

	filterArtists(): void {
		let filteredArtists = this.allArtists;
		let filteredDjs = this.allDjs;
		
		// Apply country filter if selected
		if (this.choosenCountries.length > 0) {
			filteredArtists = filteredArtists.filter(artist =>
				this.choosenCountries.includes(artist.artistCountry)
			);
		
			filteredDjs = filteredDjs.filter(dj =>
				this.choosenCountries.includes(dj.artistCountry)
			);
		}
		
		// Apply featured filter if toggle is checked
		if (this.isFeaturedChecked) {
			filteredArtists = filteredArtists.filter(artist => artist.featured);
			filteredDjs = filteredDjs.filter(dj => dj.featured);
		}
		
		this.artists = filteredArtists;
		this.djs = filteredDjs;
	}
}
