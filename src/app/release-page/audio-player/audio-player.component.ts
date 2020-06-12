import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent {
    @Input() embedAudio: string;
}
