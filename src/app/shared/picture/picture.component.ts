import { Component, Input } from '@angular/core';
import { IMAGEFOLDER } from '../../../environments/environment';
import { Cover } from 'src/app/core/models/image.model';

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
