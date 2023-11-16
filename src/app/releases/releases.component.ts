import { Observable } from 'rxjs';
import { Component, OnInit, Inject, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataService } from '../core/services/data.service';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { ReleaseCardComponent } from './../shared/release-card/release-card.component';
import { HeadingComponent } from './../layout/heading/heading.component';
import { Release } from '../core/models/release.model';

@Component({
	standalone: true,
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
export class ReleasesComponent implements OnInit {
	private dataService = inject(DataService);
	private metaData = inject(MetaDataService);
	
	public releases$: Observable<Release[]>;

	private metaDataObj: iMeta = {
		title: 'Our Catalogue | Moon Koradji Records',
		description: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.',
		ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
		ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
		ogUrl: 'https://www.moonkoradji.com/releases',
		ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.'
	}

	ngOnInit(): void {
		this.releases$ = this.dataService.requestToData('releases');

		this.metaData.setMetaData(this.metaDataObj);
	}
}
