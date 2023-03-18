import { PipesModule } from './../../core/pipes/pipes.module';
import { Component, Input } from '@angular/core';

@Component({
	// standalone: true,
	// imports: [PipesModule],
	selector: 'app-shared-video',
	templateUrl: './video.component.html'
})
export class SharedVideoComponent {
	@Input() embedVideo: string;
}
