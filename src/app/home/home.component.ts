import { PodcastComponent } from './podcast/podcast.component';
import { ReleaseCardComponent } from './../shared/release-card/release-card.component';
import { GalleryModule } from '../shared/gallery/gallery.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeadingComponent } from './../layout/heading/heading.component';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { Crystalization } from '../../assets/scripts/crystal-paralax';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../core/services/data.service';
import { Gallery } from '../core/models/gallery.model';
import { News } from '../core/models/news.model';
import { Release } from '../core/models/release.model';
import { IMAGEFOLDER } from '../../environments/environment';
import { JsonLDService } from './../core/services/json-ld.service';

declare var window: any;

@Component({
	selector: 'mk-home',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		GalleryModule, // TODO
		HeadingComponent,
		ReleaseCardComponent,
		PodcastComponent
	],
	templateUrl: './home.component.html',
	styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	public coverFolder = IMAGEFOLDER + 'release-cover/';
	public featuredArtists: string[] = ['Ziul Oiram', 'Already Maged', 'Molchun', 'Inzect', 'Adansonia', 'Taigan Sunset', 'Traskel'];
	public featuredGalleryItems: Gallery[];

	public _purchase$: Observable<any> = this.dataService.requestToData('purchase');
	public news$: Observable<News[]> = this.dataService.requestToData('news');
	public _releases$: Observable<Release[]> = this.dataService.requestToData('releases');

	// public crystalization = new Crystalization();

	constructor(
		private dataService: DataService,
		private jsonLDService: JsonLDService,
		private metaData: MetaDataService
	) {}

	ngOnInit() {
		// this.crystalization.init('.brand-text');

		this.getFeaturedGaleryItems();

		this.jsonLDService.insertSchema(this.jsonLDService.orgSchema);

		const metaDataObj: iMeta = {
			title: 'Enter the Realm of Psychedelic Sounds: Moon Koradji Records\' home page',
			description: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. dj Omsun.',
			ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
			ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
			ogUrl: 'https://www.moonkoradji.com/',
			ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. dj Omsun.'
		}

		this.metaData.setMetaData(metaDataObj);
	}

	ngOnDestroy() {
		// this.crystalization.destroy();
	}

	getFeaturedGaleryItems() {
		this.featuredGalleryItems = this.featuredArtists.map(artist => {
			return {
				name: artist,
				route: `/artists/${artist.replace(' ', '-').toLocaleLowerCase()}`,
				image: {
					default: `featured_${artist.replace(' ', '_').toLocaleLowerCase()}.jpg`,
					//webp: `featured_${artist.replace(' ', '_').toLocaleLowerCase()}.webp`
				}
			}
		})
	}
}
