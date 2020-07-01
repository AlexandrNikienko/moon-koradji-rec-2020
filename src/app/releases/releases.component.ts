import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';

@Component({
	selector: 'app-releases',
	templateUrl: './releases.component.html'
})
export class ReleasesComponent implements OnInit {
	public releases$ = this.dataService.requestToData('releases');

	constructor(private dataService: DataService) { }

	ngOnInit() {
	}

}
