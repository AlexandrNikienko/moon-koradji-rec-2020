import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { Crystalization } from '../../assets/scripts/crystal-paralax';

import { SharedLoaderComponent } from './../shared/loader/loader.component';
import { Observable } from 'rxjs';
import { SafeHtmlPipe } from '../core/pipes/safe-html.pipe';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		SafeHtmlPipe,
		SharedLoaderComponent
	],
	selector: 'app-podcasts',
	templateUrl: './podcasts.component.html',
	styleUrls: ['podcasts.component.scss']
})
export class PodcastsComponent implements OnInit, OnDestroy {
	private dataService = inject(DataService);
	private metaData = inject(MetaDataService);

	podcasts$: Observable<any[]>;

	crystalization = new Crystalization();

	metaDataObj: iMeta = {
		title: 'Dive into the Psychedelic Soundscape: Our Podcasts on Moon Koradji Records',
		description: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko aka DJ Omsun.',
		ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
		ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
		ogUrl: 'https://www.moonkoradji.com/podcasts',
		ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko aka DJ Omsun.'
	}

	ngOnInit() {
		this.podcasts$ = this.dataService.requestToData('podcasts');
		this.metaData.setMetaData(this.metaDataObj);

		this.crystalization.init();
	}

	ngOnDestroy() {
		this.crystalization.destroy();
	}
}
