import { Component, OnInit, Input } from '@angular/core';

import { Gallery } from '../../core/models/gallery.model';

@Component({
    selector: 'app-shared-gallery',
    templateUrl: './gallery.component.html'
})
export class SharedGalleryComponent implements OnInit {
    @Input() items: Gallery[];
    public swiperConfig: object;

    ngOnInit() {
        this.swiperConfig = {
            a11y: true,
            direction: 'horizontal',
            slidesPerView: 4,
            spaceBetween: 30,
            keyboard: true,
            mousewheel: false,
            scrollbar: false,
            navigation: true,
            pagination: false,
            loop: true,
            autoplay: true,
            effect: 'slide',
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            },
            _breakpoints: {
                '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10,
                },
                '@0.75': {
                slidesPerView: 2,
                spaceBetween: 20,
                },
                '@1.00': {
                slidesPerView: 3,
                spaceBetween: 40,
                },
                '@1.50': {
                slidesPerView: 4,
                spaceBetween: 50,
                },
            }
        }
    }
}
