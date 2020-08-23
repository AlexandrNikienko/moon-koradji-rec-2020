import { Component, Input } from '@angular/core';
import { Release } from '../../core/models/release.model';
import { IMAGEFOLDER } from '../../../environments/environment';

@Component({
	selector: 'app-release-card',
	templateUrl: './release-card.component.html'
})
export class ReleaseCardComponent {
	@Input() releaseItem: Release;
	public coverFolder = IMAGEFOLDER + 'release-cover/';
}
