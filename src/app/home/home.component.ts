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
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	// @ViewChild('welcomeBanner') welcomeBanner: ElementRef;

	public coverFolder = IMAGEFOLDER + 'release-cover/';
	public featuredArtists: string[] = ['Ziul Oiram', 'Already Maged', 'Molchun', 'Inzect', 'Adansonia', 'Taigan Sunset', 'Traskel'];
	public featuredGalleryItems: Gallery[];

	public _purchase$: Observable<any> = this.dataService.requestToData('purchase');
	public news$: Observable<News[]> = this.dataService.requestToData('news');
	public _releases$: Observable<Release[]> = this.dataService.requestToData('releases');

	// public crystalization = new Crystalization();

	constructor(private dataService: DataService, private jsonLDService: JsonLDService) { }

	ngOnInit() {
		// this.crystalization.init('.brand-text');

		this.getFeatureGaleryItems();

		this.jsonLDService.insertSchema(this.jsonLDService.orgSchema)
	}

	ngOnDestroy() {
		// this.crystalization.destroy();
	}

	getFeatureGaleryItems() {
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
