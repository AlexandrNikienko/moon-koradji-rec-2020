import { Component, viewChildren, inject, ElementRef, computed, effect, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DataSignalService } from '../core/services/data-signal';

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
export class ArtistsComponent {
	artistNames = viewChildren('artistName', { read: ElementRef });

	private dataSignalService = inject(DataSignalService);
	private metaData = inject(MetaDataService);

	private allArtists: Signal<Artist[]> = this.dataSignalService.getData<Artist>('artists');

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
	countryList = computed<{ artistCountry: string, flag: string }[]>(() => {
		// Create an array of alphabet pairs (artistCountry, flag)
		const countryFlagPairs = this.allArtists().map(artist => ({ artistCountry: artist.artistCountry, flag: artist.flag }));
		const uniquePairsSet = new Set(countryFlagPairs.map(o => JSON.stringify(o)));
		const uniquePairs = Array.from(uniquePairsSet).map(o => JSON.parse(o));
		return uniquePairs.sort((a, b) => a.artistCountry.localeCompare(b.artistCountry));
	});
	choosenCountries = toSignal(
		this.countries.valueChanges ?? null, 
		{ initialValue: [] }
	);

	statuses = new FormControl<ArtistStatus>('All');
	statusList: ArtistStatus[] = ['All', 'Active', 'Inactive', 'Featured', 'Has Podcast'];
	choosenStatus = toSignal(
		this.statuses.valueChanges ?? null,
		{ initialValue: 'All' }
	);

	constructor() {
		effect(() => {	
			if (this.artists()) {
				this.runAlphabeticalMarksAfterRender();
				this.metaData.setMetaData(this.metaDataObj);
			}
		});
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
