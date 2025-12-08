import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { JsonLDService } from './../core/services/json-ld.service';
import { DataService } from '../core/services/data.service';

import { HeadingComponent } from './../layout/heading/heading.component';
import { PodcastComponent } from './podcast/podcast.component';
import { ReleaseCardComponent } from './../shared/release-card/release-card.component';
import { GalleryModule } from '../shared/gallery/gallery.module';
import { Gallery } from '../core/models/gallery.model';
import { News } from '../core/models/news.model';
import { Release } from '../core/models/release.model';
import { Event } from '../core/models/event.model';
import { IMAGEFOLDER } from '../../environments/environment';
import { PictureComponent } from '../shared/picture/picture.component';
import { Artist } from '../core/models/artist.model';

@Component({
    selector: 'mk-home',
    imports: [
        CommonModule,
        RouterModule,
        GalleryModule, // TODO
        HeadingComponent,
        ReleaseCardComponent,
        PodcastComponent,
        PictureComponent
    ],
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	private dataService = inject(DataService);
	private jsonLDService = inject(JsonLDService);
	private metaData = inject(MetaDataService);

	coverFolder = IMAGEFOLDER + 'release-cover/';
	featuredGalleryItems: Gallery[] = [];

	purchase$: Observable<any>;
	news$: Observable<News[]>;
	releases$: Observable<Release[]>;
	events$: Observable<Event[]>;
	purchaseSub: Subscription;
	filteredReleases$: Observable<Release[]>;
	artists$: Observable<Artist[]>;
	featuredArtists: Artist[] = []

	@ViewChildren(ReleaseCardComponent, { read: ElementRef })
  	releaseCards!: QueryList<ElementRef>;

	// @ViewChildren(PictureComponent, { read: ElementRef })
  	// pictures!: QueryList<ElementRef>;

	private observer!: IntersectionObserver;

	// private metaDataObj: iMeta = {
	// 	title: 'Enter the Realm of Psychedelic Sounds: Moon Koradji Records\' home page',
	// 	description: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.',
	// 	ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
	// 	ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
	// 	ogUrl: 'https://www.moonkoradji.com/',
	// 	ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.'
	// }

	ngOnInit() {
		this.purchase$ = this.dataService.requestToData('purchase');
		this.news$ = this.dataService.requestToData('news');
		this.releases$ = this.dataService.requestToData('releases');
		this.events$ = this.dataService.requestToData<Event>('events').pipe(
			map(events => 
				events
					.filter(e => {
						const today = new Date();
						const endDate = new Date(e.endDate); // assuming endDate is ISO
						return endDate >= today;
					})
					.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
					.slice(0, 3)
			)
		);

		this.filteredReleases$ = this.releases$.pipe(
			map(releases => releases.filter(release => !release.isHero && !release.hidden).slice(0, 3))
		);

		this.artists$ = this.dataService.requestToData('artists');
		this.artists$.subscribe(artists => {
			this.featuredArtists = this.shuffleArray(artists.filter(artist => artist.featured));
			this.getFeaturedGaleryItems();
		})

		// this.jsonLDService.insertSchema(this.jsonLDService.orgSchema);

		// this.metaData.setMetaData(this.metaDataObj);
	}

	shuffleArray(array: any[]): any[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	ngOnDestroy() {
		if (this.observer) {
			this.observer.disconnect();
		}
	}

	getFeaturedGaleryItems() {
		this.featuredGalleryItems = this.featuredArtists.map(artist => {
			const artistName = artist.artistName;

			return {
				name: artistName,
				route: `/artists/${artistName.replace(/ /g, '-').toLocaleLowerCase()}`,
				image: {
					default: `featured_${artistName.replace(/ /g, '_').toLocaleLowerCase()}.jpg`,
					webp: `featured_${artistName.replace(/ /g, '_').toLocaleLowerCase()}.webp`
				}
			}
		})
	}

	getArtistRoute(artist: string): string {
		return '/artists/' + artist.toLowerCase().replace(/ /g, '-');
	}

	ngAfterViewInit() {
		this.initScrollAnimation();

		// Re-run when list of releaseCards or pictures changes (async render)
		this.releaseCards.changes.subscribe(() => this.initScrollAnimation());
		//this.pictures.changes.subscribe(() => this.initScrollAnimation());
	}

	initScrollAnimation() {
		if (!this.observer) {
			this.observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in'); // 👈 add CSS animation class
						//this.observer.unobserve(entry.target);    // animate once
					} else {
						entry.target.classList.remove('animate-in')
					}
				});
			}, { threshold: 0.2 }); // trigger when 20% visible
		}

		// Observe release cards
		this.releaseCards.forEach(card =>
			this.observer.observe(card.nativeElement)
		);

		// Observe pictures
		// this.pictures.forEach(pic =>
		// 	this.observer.observe(pic.nativeElement)
		// );
	}
}
