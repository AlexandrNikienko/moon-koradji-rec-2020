import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-shared-video',
	templateUrl: './video.component.html'
})
export class SharedVideoComponent {
	@Input() embedVideo: string;
}
