import { SafeHtmlPipe } from 'src/app/core/pipes/safe-html.pipe';
import { Component, Input } from '@angular/core';

@Component({
    imports: [SafeHtmlPipe],
    selector: 'app-shared-video',
    templateUrl: './video.component.html'
})
export class SharedVideoComponent {
	@Input() embedVideo: string;
}
