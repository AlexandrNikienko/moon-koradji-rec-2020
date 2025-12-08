import { RouterModule } from '@angular/router';
import { iMeta, MetaDataService } from './../core/services/meta-data.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
    imports: [RouterModule],
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.scss']
})
export class AboutComponent implements OnInit {
	private metaData = inject(MetaDataService);

	private metaDataObj: iMeta = {
		title: 'Our Mission at Moon Koradji Records',
		description: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.',
		ogTitle: 'Moon Koradji Records - Worl Wide Psychedelic',
		ogImage: 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
		ogUrl: 'https://www.moonkoradji.com/about',
		ogDescription: 'Independent ukrainian psytrance label founded in 2007 by Oleksandr Nikiienko aka DJ Omsun.'
	}

	ngOnInit() {
		this.metaData.setMetaData(this.metaDataObj);
	}
}
