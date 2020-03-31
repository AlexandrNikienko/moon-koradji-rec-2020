import {Component, Input} from '@angular/core';

import {Release} from '../../core/models/release.model';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html'
})
export class AudioPlayerComponent {
    @Input() release: Release;
}
