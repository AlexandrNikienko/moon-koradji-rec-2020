import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';

import { Crystalization } from '../../assets/scripts/crystal-paralax';

@Component({
	selector: 'app-podcasts-page',
	templateUrl: './podcasts-page.component.html'
})
export class PodcastsPageComponent implements OnInit, OnDestroy {
	public podcasts$ = this.dataService.requestToData('podcasts');

	public crystalization = new Crystalization();

	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.crystalization.init();
	}

	ngOnDestroy() {
		this.crystalization.destroy();
	}
}
