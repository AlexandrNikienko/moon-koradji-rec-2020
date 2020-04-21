import {Component, Input} from '@angular/core';
import {Release} from '../../core/models/release.model';

@Component({
    selector: 'app-release-card',
    templateUrl: './release-card.component.html'
})
export class ReleaseCardComponent {
    @Input() releaseItem: Release;
}
