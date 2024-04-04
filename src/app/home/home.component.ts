import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { JsonLDService } from './../core/services/json-ld.service';
import { DataService } from '../core/services/data.service';
import { Crystalization } from '../../assets/scripts/crystal-paralax';

import { HeadingComponent } from './../layout/heading/heading.component';
import { PodcastComponent } from './podcast/podcast.component';
import { ReleaseCardComponent } from './../shared/release-card/release-card.component';
import { GalleryModule } from '../shared/gallery/gallery.module';
import { Gallery } from '../core/models/gallery.model';
import { News } from '../core/models/news.model';
import { Release } from '../core/models/release.model';
import { IMAGEFOLDER } from '../../environments/environment';
import { PictureComponent } from '../shared/picture/picture.component';


@Component({
	selector: 'mk-home',
	standalone: true,
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
	featuredArtists = ['Irukanji', 'Shiibashunsuke', 'Ziul Oiram', 'Already Maged', 'Inzect', 'Adansonia', 'Molchun', 'Traskel', 'Distorted Goblin', 'Whrikk'];
	featuredGalleryItems: Gallery[] = [];

	purchase$: Observable<any>;
	news$: Observable<News[]>;
	releases$: Observable<Release[]>;
	purchaseSub: Subscription;

	crystalization = new Crystalization();

	private metaDataObj: iMeta = {
		title: 'Enter the Realm of Psychedelic Sounds: Moon Koradji Records\' home page',
		description: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.',
		ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
		ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
		ogUrl: 'https://www.moonkoradji.com/',
		ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.'
	}

	ngOnInit() {
		this.purchase$ = this.dataService.requestToData('purchase');
		this.news$ = this.dataService.requestToData('news');
		this.releases$ = this.dataService.requestToData('releases');

		this.getFeaturedGaleryItems();

		// this.jsonLDService.insertSchema(this.jsonLDService.orgSchema);

		// this.metaData.setMetaData(this.metaDataObj);
	}

	ngOnDestroy() {
	}

	getFeaturedGaleryItems() {
		this.featuredGalleryItems = this.featuredArtists.map(artist => {
			return {
				name: artist,
				route: `/artists/${artist.replace(' ', '-').toLocaleLowerCase()}`,
				image: {
					default: `featured_${artist.replace(' ', '_').toLocaleLowerCase()}.jpg`,
					webp: `featured_${artist.replace(' ', '_').toLocaleLowerCase()}.webp`
				}
			}
		})
	}
}
