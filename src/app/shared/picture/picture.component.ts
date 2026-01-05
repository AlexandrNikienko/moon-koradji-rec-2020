import { Component, input } from '@angular/core';
import { IMAGEFOLDER } from '../../../environments/environment';
import { Cover } from 'src/app/core/models/image.model';

@Component({
	selector: 'app-picture',
	templateUrl: './picture.component.html',
	styles: ['.picture { display: block; aspect-ratio: 1;} .picture img {object-fit: cover; height: 100%;}']
})
export class PictureComponent {
	cover = input<Cover>();
	class = input<string>();
	imageFolder = input<string>();
	IMAGEFOLDER = IMAGEFOLDER;
}
