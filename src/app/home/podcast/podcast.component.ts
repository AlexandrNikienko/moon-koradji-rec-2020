import { HeadingComponent } from './../../layout/heading/heading.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Signal, computed, inject } from "@angular/core";

import { DataSignalService } from './../../core/services/data-signal';
import { PodcastAdv } from '../../core/models/podcast-adv.model';

@Component({
    imports: [CommonModule, RouterModule, HeadingComponent],
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['podcasts-adv.scss']
})
export class PodcastComponent {
	private dataSignalService = inject(DataSignalService);

	podcast: Signal<PodcastAdv[]> = this.dataSignalService.getData<PodcastAdv>('podcast');
	logo: Signal<string> = computed<string>(() => this.podcast().length ? this.logoMap[this.podcast()[0].month.toLowerCase()] : '');

	logoMap: object = {
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
}
