import { Component, DestroyRef, ElementRef, Signal, computed, effect, inject, viewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { JsonLDService } from './../core/services/json-ld.service';
import { DataSignalService } from '../core/services/data-signal';

import { HeadingComponent } from './../layout/heading/heading.component';
import { PodcastComponent } from './podcast/podcast.component';
import { ReleaseCardComponent } from './../shared/release-card/release-card.component';
import { HeroComponent } from '../hero/hero.component';
import { GalleryModule } from '../shared/gallery/gallery.module';
import { Gallery } from '../core/models/gallery.model';
import { News } from '../core/models/news.model';
import { Release } from '../core/models/release.model';
import { Event } from '../core/models/event.model';
import { IMAGEFOLDER } from '../../environments/environment';
import { PictureComponent } from '../shared/picture/picture.component';
import { Artist } from '../core/models/artist.model';
import { Purchase } from '../core/models/purchase.model';

type EventWithArtistRoutes = Event & { artists: { artistName: string; artistRoute: string }[] };

@Component({
    selector: 'mk-home',
    imports: [
        CommonModule,
        RouterModule,
        GalleryModule, // TODO
		HeroComponent,
        HeadingComponent,
        ReleaseCardComponent,
        PodcastComponent,
        PictureComponent
    ],
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {
	private dataSignalService = inject(DataSignalService);
	private destroyRef = inject(DestroyRef);
	private jsonLDService = inject(JsonLDService);
	private metaData = inject(MetaDataService);

	coverFolder = IMAGEFOLDER + 'release-cover/';

	purchase: Signal<Purchase[]> = this.dataSignalService.getData<Purchase>('purchase');

	allReleases: Signal<Release[]> = this.dataSignalService.getData<Release>('releases');

	recentReleases: Signal<Release[]> = computed<Release[]>(() =>
		this.allReleases().filter(release => !release.isHero && !release.hidden).slice(0, 3)
	);

	artists: Signal<Artist[]> = this.dataSignalService.getData<Artist>('artists');

	featuredArtists: Signal<Artist[]> = computed<Artist[]>(() =>
		this.artists().filter(artist => artist.featured && artist.role !== 'dj')
	);

	featuredGalleryItems: Signal<Gallery[]> = computed<Gallery[]>(() => {
		return this.shuffleArray(this.featuredArtists()).map(artist => {
			const artistName = artist.artistName;

			return {
				name: artistName,
				route: `/artists/${artistName.replace(/ /g, '-').toLocaleLowerCase()}`,
				image: {
					default: `featured_${artistName.replace(/ /g, '_').toLocaleLowerCase()}.jpg`,
					webp: `featured_${artistName.replace(/ /g, '_').toLocaleLowerCase()}.webp`
				}
			};
		})
	});

	news: Signal<News[]> = this.dataSignalService.getData<News>('news');

	events: Signal<Event[]> = this.dataSignalService.getData<Event>('events');

	futureEvents: Signal<EventWithArtistRoutes[]> = computed<EventWithArtistRoutes[]>(() => {
		const today = new Date();

		return this.events()
			.filter(e => new Date(e.endDate) >= today)
			.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
			.slice(0, 3)
			.map(event => ({
				...event,
				artists: event.artists.map(artistName => ({
					artistName,
					artistRoute: this.getArtistRoute(artistName)
				}))
			} as EventWithArtistRoutes));
	});

	releaseCards = viewChildren(ReleaseCardComponent, { read: ElementRef });

	private observer!: IntersectionObserver;

	constructor() {
		effect(() => {
			if (!this.releaseCards().length) return;

			this.initScrollAnimation();

			this.releaseCards().forEach(card =>
				this.observer!.observe(card.nativeElement)
			);
		},
		{ allowSignalWrites: true }

		// this.jsonLDService.insertSchema(this.jsonLDService.orgSchema);
		// this.metaData.setMetaData(this.metaDataObj);
	)}

	private initScrollAnimation() {
		if (this.observer) return;

		this.observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					entry.target.classList.toggle(
						'animate-in',
						entry.isIntersecting
					);
				});
			},
			{ threshold: 0.2 }
		);

		// cleanup automatically when component is destroyed
		this.destroyRef.onDestroy(() => {
			this.observer?.disconnect();
			this.observer = null;
		});
	}

	private metaDataObj: iMeta = {
		title: 'Enter the Realm of Psychedelic Sounds: Moon Koradji Records\' home page',
		description: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.',
		ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
		ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
		ogUrl: 'https://www.moonkoradji.com/',
		ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.'
	}

	shuffleArray<T>(array: T[]): T[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	getArtistRoute(artistName: string): string {
		return `/artists/${artistName.replace(/ /g, '-').toLocaleLowerCase()}`
	}
}
