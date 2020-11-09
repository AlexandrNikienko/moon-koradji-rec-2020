import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../core/services/data.service';
import { Gallery } from '../core/models/gallery.model';
import { News } from '../core/models/news.model';
import { Release } from './../core/models/release.model';
import { IMAGEFOLDER } from '../../environments/environment';

declare var window: any;

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
	public coverFolder = IMAGEFOLDER + 'release-cover/';
	public featuredArtists: string[] = ['Already Maged', 'Molchun', 'Inzect', 'Adansonia', 'Taigan Sunset', 'Traskel'];
	public featuredGalleryItems: Gallery[];

	public _purchase$: Observable<any> = this.dataService.requestToData('purchase');
	public _news$: Observable<News[]> = this.dataService.requestToData('news');
	public _releases$: Observable<Release[]> = this.dataService.requestToData('releases');

	constructor(private dataService: DataService) { }

	ngOnInit() {
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

		if (window.FB) {
			window.FB.init({
				appId: '484153925308268',
				xfbml: true,
				version: 'v3.2'
			});
		}
	}
}
