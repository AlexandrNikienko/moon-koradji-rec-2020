import { Component, inject, computed, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DataSignalService } from '../core/services/data-signal';

import { HeadingComponent } from './../layout/heading/heading.component';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { Artist } from '../core/models/artist.model';

type ArtistStatus = 'All' | 'Active' | 'Inactive' | 'Featured' | 'Has Podcast';

type artistsWithLetters = Artist & { letter: string | null };

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
	private dataSignalService = inject(DataSignalService);
	private metaData = inject(MetaDataService);

	private allArtists: Signal<Artist[]> = this.dataSignalService.getData<Artist>('artists');

	filteredArtists = computed<Artist[]>(() => {
		const artists = this.allArtists();
		const countries = this.choosenCountries();
		const status = this.choosenStatus();

		return this.filterArtists(artists, countries, status);
	});

	artists = computed<Artist[]>(() =>
		this.filteredArtists().filter(a => a.role !== 'dj')
	);

	djs = computed<Artist[]>(() =>
		this.filteredArtists().filter(a => a.role === 'dj')
	);

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
		const map = new Map<string, string>();

		for (const a of this.allArtists()) {
			map.set(a.artistCountry, a.flag);
		}

		return Array.from(map.entries())
			.map(([artistCountry, flag]) => ({ artistCountry, flag }))
			.sort((a, b) => a.artistCountry.localeCompare(b.artistCountry));
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

	artistsWithLetters = computed<artistsWithLetters[]>(() => {
		let startLetter = '';

		return this.artists().map(artist => {
			const currentLetter = artist.artistName.charAt(0).toUpperCase();
			const letter = currentLetter !== startLetter ? currentLetter : null;
			startLetter = currentLetter;

			return {...artist, letter };
		});
	});

	constructor() {
		this.metaData.setMetaData(this.metaDataObj);
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
