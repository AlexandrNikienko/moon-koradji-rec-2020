import { Component, inject, Signal, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataSignalService } from '../core/services/data-signal';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { ReleaseCardComponent } from './../shared/release-card/release-card.component';
import { HeadingComponent } from './../layout/heading/heading.component';
import { Release } from '../core/models/release.model';

@Component({
    imports: [
        CommonModule,
        RouterModule,
        HeadingComponent,
        ReleaseCardComponent
    ],
    selector: 'app-releases',
    templateUrl: './releases.component.html',
    styleUrls: ['releases.scss']
})
export class ReleasesComponent {
	private dataSignalService = inject(DataSignalService);
	private metaData = inject(MetaDataService);
	
	public releases: Signal<Release[]> = this.dataSignalService.getData<Release>('releases');

	private metaDataObj: iMeta = {
		title: 'Our Catalogue | Moon Koradji Records',
		description: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.',
		ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
		ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
		ogUrl: 'https://www.moonkoradji.com/releases',
		ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.'
	}

	constructor() {
		this.metaData.setMetaData(this.metaDataObj);
	}
}
