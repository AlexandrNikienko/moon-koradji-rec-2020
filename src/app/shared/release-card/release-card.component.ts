import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Release } from '../../core/models/release.model';
import { IMAGEFOLDER } from '../../../environments/environment';
import { PictureComponent } from '../picture/picture.component';

@Component({
    imports: [CommonModule, RouterModule, PictureComponent],
    selector: 'app-release-card',
    templateUrl: './release-card.component.html'
})
export class ReleaseCardComponent {
	@Input() releaseItem: Release;
	
	public coverFolder = IMAGEFOLDER + 'release-cover/';
}
