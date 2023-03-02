import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';

import { Crystalization } from '../../assets/scripts/crystal-paralax';

@Component({
	selector: 'app-podcasts',
	templateUrl: './podcasts.component.html',
	styleUrls: ['podcasts.component.scss']
})
export class PodcastsComponent implements OnInit, OnDestroy {
	public podcasts$ = this.dataService.requestToData('podcasts');

	public crystalization = new Crystalization();

	constructor(
		private dataService: DataService,
		private metaData: MetaDataService
	) {}

	ngOnInit() {
		const metaDataObj: iMeta = {
			title: 'Dive into the Psychedelic Soundscape: Our Podcasts on Moon Koradji Records',
			description: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. dj Omsun.',
			ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
			ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
			ogUrl: 'https://www.moonkoradji.com/podcasts',
			ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. dj Omsun.'
		}

		this.metaData.setMetaData(metaDataObj);

		this.crystalization.init();
	}

	ngOnDestroy() {
		this.crystalization.destroy();
	}
}
