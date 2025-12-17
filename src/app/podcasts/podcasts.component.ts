import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Signal, afterNextRender, effect, inject } from '@angular/core';

import { DataSignalService } from '../core/services/data-signal';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { Crystalization } from '../../assets/scripts/crystal-paralax';

import { SafeHtmlPipe } from '../core/pipes/safe-html.pipe';
import { SharedLoaderComponent } from '../shared/loader/loader.component';

@Component({
    imports: [
        CommonModule,
        SafeHtmlPipe,
        SharedLoaderComponent
    ],
    selector: 'app-podcasts',
    templateUrl: './podcasts.component.html',
    styleUrls: ['podcasts.component.scss']
})
export class PodcastsComponent {
	private dataSignalService = inject(DataSignalService);
	private metaData = inject(MetaDataService);
	private destroyRef = inject(DestroyRef);

	podcasts: Signal<any[]> = this.dataSignalService.getData<any[]>('podcasts');

	crystalization = new Crystalization();

	metaDataObj: iMeta = {
		title: 'Dive into the Psychedelic Soundscape: Our Podcasts on Moon Koradji Records',
		description: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.',
		ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
		ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
		ogUrl: 'https://www.moonkoradji.com/podcasts',
		ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.'
	}

	constructor() {
		effect(() => {
			if (this.podcasts()) {
				this.metaData.setMetaData(this.metaDataObj);
			}
		});

		afterNextRender(() => {
			this.crystalization.init();

			this.destroyRef.onDestroy(() => {
				this.crystalization.destroy();
			});
		});
	}
}
