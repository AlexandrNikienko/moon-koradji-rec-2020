import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-shared-gallery',
    templateUrl: './gallery.component.html'
})
export class SharedGalleryComponent implements OnInit {
    public swiperConfig: object;

    ngOnInit() {
        this.swiperConfig = {
            a11y: true,
            direction: 'horizontal',
            slidesPerView: 1,
            keyboard: true,
            mousewheel: false,
            scrollbar: false,
            navigation: true,
            pagination: false,
            loop: true,
            autoplay: true,
            centeredSlides: true,
            effect: 'fade'
        };
    }
}
