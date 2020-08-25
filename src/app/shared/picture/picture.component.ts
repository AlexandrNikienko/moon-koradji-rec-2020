import { Component, Input } from '@angular/core';
import { IMAGEFOLDER } from '../../../environments/environment';

@Component({
	selector: 'app-picture',
	templateUrl: './picture.component.html'
})
export class PictureComponent {
	@Input() cover: any;
	@Input() class: string;
	@Input() imageFolder: string;
	public IMAGEFOLDER = IMAGEFOLDER;
}
