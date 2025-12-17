
import { Component, OnInit, input } from '@angular/core';

import { Gallery } from '../../core/models/gallery.model';

import { register } from 'swiper/element/bundle';
register();

import { Swiper } from 'swiper/types';

@Component({
    selector: 'app-shared-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['swiper.scss'],
    standalone: false
})
export class SharedGalleryComponent implements OnInit {
	items = input<Gallery[]>();

	ngOnInit() {
		const swiperEl = document.querySelector('swiper-container');
		const buttonPrev = document.querySelector('.swiper-button-prev');
		const buttonNext = document.querySelector('.swiper-button-next');

		buttonPrev.addEventListener('click', () => {
			//@ts-ignore
			swiperEl.swiper.slidePrev();
		});

		buttonNext.addEventListener('click', () => {
			//@ts-ignore
			swiperEl.swiper.slideNext();
		});

		const swiperConfig = {
			//autoplay: true,
			//a11y: true,
			//slidesPerView: 4,
			spaceBetween: 30,
			// navigation: true,
			loop: true,
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
			}
		}

		Object.assign(swiperEl, swiperConfig);

		//@ts-ignore
		swiperEl.initialize();
	}
}
