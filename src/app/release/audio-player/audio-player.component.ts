import { SafeHtmlPipe } from 'src/app/core/pipes/safe-html.pipe';
import { SharedLoaderComponent } from './../../shared/loader/loader.component';
import { Component, Input } from '@angular/core';

@Component({
    imports: [SharedLoaderComponent, SafeHtmlPipe],
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['audio-player.scss']
})
export class AudioPlayerComponent {
	@Input() embedAudio: string;
}
