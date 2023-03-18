import { PipesModule } from './../../core/pipes/pipes.module';
import { SharedLoaderComponent } from './../../shared/loader/loader.component';
import { Component, Input } from '@angular/core';

@Component({
	standalone: true,
	imports: [SharedLoaderComponent, PipesModule],
	selector: 'app-audio-player',
	templateUrl: './audio-player.component.html',
	styleUrls: ['audio-player.scss']
})
export class AudioPlayerComponent {
	@Input() embedAudio: string;
}
