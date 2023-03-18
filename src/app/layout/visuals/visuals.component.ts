import { Component } from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-visuals',
	templateUrl: './visuals.component.html'
})

export class VisualsComponent {
	public videoSource = '/assets/video/stars.mp4';
}
