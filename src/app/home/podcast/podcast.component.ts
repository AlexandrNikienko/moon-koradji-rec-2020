import { HeadingComponent } from './../../layout/heading/heading.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription } from 'rxjs';

import { DataService } from './../../core/services/data.service';
import { PodcastAdv } from './../../core/models/podcast-add.model';

@Component({
	standalone: true,
	imports: [CommonModule, RouterModule, HeadingComponent],
	selector: 'app-podcast',
	templateUrl: './podcast.component.html',
	styleUrls: ['podcasts-adv.scss']
})
export class PodcastComponent implements OnDestroy {
	public _podcast$: Observable<PodcastAdv> = this.dataService.requestToData('podcast');

	public logoMap: object = {
		january: "01-mk-logo-jan-200.jpg",
		february: "02-mk-logo-feb-200.jpg",
		march: "03-mk-logo-mar-200.jpg",
		april: "04-mk-logo-apr-200.jpg",
		may: "05-mk-logo-may-200.jpg",
		june: "06-mk-logo-jun-200.jpg",
		july: "07-mk-logo-jul-200.jpg",
		august: "08-mk-logo-aug-200.jpg",
		september: "09-mk-logo-sep-200.jpg",
		october: "10-mk-logo-oct-200.jpg",
		november: "11-mk-logo-nov-200.jpg",
		december: "12-mk-logo-dec-200.jpg",
	}

	public logoSub: Subscription;
	public logo: string;

	constructor(private dataService: DataService) { 
		this.logoSub = this._podcast$.subscribe(podcast => {
			this.logo = this.logoMap[podcast.month.toLowerCase()]
		})
	}

	ngOnDestroy() {
		this.logoSub.unsubscribe();
	}
}
