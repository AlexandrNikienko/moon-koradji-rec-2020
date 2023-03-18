import { Component, Input } from '@angular/core';
import { IMAGEFOLDER } from '../../../environments/environment';

interface Cover {
	default: string;
	default2x: string;
	webp: string;
	webp2x: string;
};

@Component({
	standalone: true,
	selector: 'app-picture',
	templateUrl: './picture.component.html'
})
export class PictureComponent {
	@Input() cover: Cover;
	@Input() class: string;
	@Input() imageFolder: string;
	public IMAGEFOLDER = IMAGEFOLDER;
}
