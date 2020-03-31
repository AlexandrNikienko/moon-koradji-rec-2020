import {Component} from '@angular/core';
import {PodcastsService} from '../core/services/podcasts.service';

@Component({
    selector: 'app-podcasts-page',
    templateUrl: './podcasts-page.component.html'
})
export class PodcastsPageComponent {
    public podcasts$ = this.podcastsService.PODCASTS$;

    constructor(private podcastsService: PodcastsService) {}
}
