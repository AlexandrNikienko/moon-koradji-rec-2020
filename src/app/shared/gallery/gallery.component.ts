import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-shared-gallery',
    templateUrl: './gallery.component.html'
})
export class SharedGalleryComponent {
    @Input() swiperConfig: object;
}
