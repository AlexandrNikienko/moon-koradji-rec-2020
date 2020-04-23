import { Component } from '@angular/core';
import { DataService } from '../core/services/data.service';

@Component({
    selector: 'app-podcasts-page',
    templateUrl: './podcasts-page.component.html'
})
export class PodcastsPageComponent {
    public podcasts$ = this.datService.requestToData('podcasts');

    constructor(private datService: DataService) { }
}
