import { RouterModule } from '@angular/router';
import { iMeta, MetaDataService } from './../core/services/meta-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
	standalone: true,
	imports: [RouterModule],
	templateUrl: 'about.component.html',
	styleUrls: ['about.component.scss'] 
})
export class AboutComponent implements OnInit {
	constructor(private metaData: MetaDataService) {}

	ngOnInit() {
		const metaDataObj: iMeta = {
			title: 'Our Mission at Moon Koradji Records',
			description: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. dj Omsun.',
			ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
			ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
			ogUrl: 'https://www.moonkoradji.com/about',
			ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. dj Omsun.'
		}

		this.metaData.setMetaData(metaDataObj);
	}
}
