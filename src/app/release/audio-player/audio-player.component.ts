import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-audio-player',
	templateUrl: './audio-player.component.html',
	styleUrls: ['audio-player.scss']
})
export class AudioPlayerComponent {
	@Input() embedAudio: string;
}
