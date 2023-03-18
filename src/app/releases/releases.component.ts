import { HeadingComponent } from './../layout/heading/heading.component';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MetaDataService, iMeta } from './../core/services/meta-data.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';

@Component({
	standalone: true,
	imports: [CommonModule, RouterModule, SharedModule, HeadingComponent],
	selector: 'app-releases',
	templateUrl: './releases.component.html',
	styleUrls: ['releases.scss']
})
export class ReleasesComponent implements OnInit {
	public releases$ = this.dataService.requestToData('releases');

	constructor(
		private dataService: DataService,
		private metaData: MetaDataService
	) {}

	ngOnInit(): void {
		const metaDataObj: iMeta = {
			title: 'Our Catalogue | Moon Koradji Records',
			description: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. dj Omsun.',
			ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
			ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
			ogUrl: 'https://www.moonkoradji.com/releases',
			ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. dj Omsun.'
		}

		this.metaData.setMetaData(metaDataObj);
	}
}
