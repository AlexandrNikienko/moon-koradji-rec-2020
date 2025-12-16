import { Component, viewChildren, OnDestroy, OnInit, inject, ElementRef, signal, computed, effect } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DataService } from '../core/services/data.service';

import { HeadingComponent } from './../layout/heading/heading.component';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { Subscription } from 'rxjs';
import { Artist } from '../core/models/artist.model';

type ArtistStatus = 'All' | 'Active' | 'Inactive' | 'Featured' | 'Has Podcast';

@Component({
    imports: [
		HeadingComponent,
		RouterModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatSlideToggleModule
	],
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['artists.scss']
})
export class ArtistsComponent implements OnInit, OnDestroy {
	artistNames = viewChildren('artistName', { read: ElementRef });

	private dataservice = inject(DataService);
	private metaData = inject(MetaDataService);

	private allArtists = signal<Artist[]>([]);

	public artists = computed<Artist[]>(() =>
		this.filterArtists(
			this.allArtists().filter(a => a.role !== 'dj'),
			this.choosenCountries(),
			this.choosenStatus()
		)
	);

	public djs = computed<Artist[]>(() =>
		this.filterArtists(
			this.allArtists().filter(a => a.role === 'dj'),
			this.choosenCountries(),
			this.choosenStatus()
		)
	);

	private alphabetEffect = effect(() => {
		this.artists(); // track dependency
		this.runAlphabeticalMarksAfterRender();
	});

	private subs: Subscription = new Subscription();

	private metaDataObj: iMeta = {
		title: 'Innovative Sounds of Psychedelic Trance: Meet Our Talented Artists and DJs',
		description: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.',
		ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
		ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
		ogUrl: 'https://www.moonkoradji.com/artists',
		ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.'
	}

	countries = new FormControl<string[]>([]);
	countryList = signal<{ artistCountry: string, flag: string }[]>([]);
	choosenCountries = signal<string[]>([]);

	statuses = new FormControl<ArtistStatus>('All');
	statusList: ArtistStatus[] = ['All', 'Active', 'Inactive', 'Featured', 'Has Podcast'];
	choosenStatus = signal<ArtistStatus>('All');

	ngOnInit(): void {
		const artistsSub = this.dataservice.requestToData<Artist>('artists').subscribe(artists => {
			this.allArtists.set(artists);

			// Create an array of alphabet pairs (artistCountry, flag)
			const countryFlagPairs = artists.map(artist => ({ artistCountry: artist.artistCountry, flag: artist.flag }));
			const uniquePairsSet = new Set(countryFlagPairs.map(o => JSON.stringify(o)));
			const uniquePairs = Array.from(uniquePairsSet).map(o => JSON.parse(o));
			this.countryList.set(uniquePairs.sort((a, b) => a.artistCountry.localeCompare(b.artistCountry)));
		});
		this.subs.add(artistsSub);

		const countriesSub = this.countries.valueChanges.subscribe(countries => {
			this.choosenCountries.set(countries ?? []);
		});
		this.subs.add(countriesSub);

		const statusesSub = this.statuses.valueChanges.subscribe(status => {
			this.choosenStatus.set(status);
		});
		this.subs.add(statusesSub);

		this.metaData.setMetaData(this.metaDataObj);
	}

	ngOnDestroy(): void {
		if (this.subs) {
			this.subs.unsubscribe();
		}
	}

	setAlphabeticalMarks(): void {
		document.querySelectorAll('.letter-separator').forEach(e => e.remove());

		let startLetter = '';
		this.artistNames().forEach(ref => {
			const el = ref.nativeElement;
			const name = el.textContent.trim();
			const firstLetter = name.charAt(0).toUpperCase();

			if (firstLetter > startLetter) {
				el.insertAdjacentHTML('afterend', `<div class="letter-separator">${firstLetter}</div>`);
				startLetter = firstLetter;
			}
		});
	}

	private runAlphabeticalMarksAfterRender(): void {
		queueMicrotask(() => this.setAlphabeticalMarks());
	}

	private filterArtists(
		list: Artist[], 
		countries: string[], 
		status: ArtistStatus
	): Artist[] {
		let result = list;

		if (countries.length > 0) {
			result = result.filter(a => countries.includes(a.artistCountry));
		}

		switch (status) {
			case 'Featured':
				return result.filter(a => a.featured);
			case 'Inactive':
				return result.filter(a => a.inactive);
			case 'Active':
				return result.filter(a => !a.inactive);
			case 'Has Podcast':
				return result.filter(a => (a.mixes?.length ?? 0) > 0);
			default:
				return result;
		}
	}
}
