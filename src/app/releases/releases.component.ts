import { Component } from '@angular/core';
import { DataService } from '../core/services/data.service';

@Component({
	selector: 'app-releases',
	templateUrl: './releases.component.html',
	styleUrls: ['releases.scss']
})
export class ReleasesComponent {
	public releases$ = this.dataService.requestToData('releases');

	constructor(private dataService: DataService) { }
}
