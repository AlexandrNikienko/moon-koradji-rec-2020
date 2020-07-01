import { Component } from "@angular/core";
import { Observable } from 'rxjs';

import { DataService } from './../../core/services/data.service';
import { PodcastAdd } from './../../core/models/podcast-add.model';

@Component({
	selector: 'app-podcast',
	templateUrl: './podcast.component.html'
})
export class PodcastComponent {
	public _podcast$: Observable<PodcastAdd> = this.dataService.requestToData('podcast');

	constructor(private dataService: DataService) { }
}
