import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../core/pipes/pipes.module';

import { SharedGalleryComponent } from './gallery/gallery.component';
import { SharedLoaderComponent } from './loader/loader.component';
import { SharedVideoComponent } from './video/video.component';
import { ReleaseCardComponent } from './release-card/release-card.component';
import { PictureComponent } from './picture/picture.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
	observer: true,
	direction: 'horizontal'
};

@NgModule({
	imports: [
		SwiperModule,
		PipesModule,
		CommonModule,
		RouterModule
	],
	exports: [
		SharedGalleryComponent,
		SharedLoaderComponent,
		SharedVideoComponent,
		ReleaseCardComponent,
		PictureComponent,
		RouterModule
	],
	declarations: [
		SharedGalleryComponent,
		SharedLoaderComponent,
		SharedVideoComponent,
		ReleaseCardComponent,
		PictureComponent
	],
	providers: [
		{
			provide: SWIPER_CONFIG,
			useValue: DEFAULT_SWIPER_CONFIG
		}
	]
})

export class SharedModule {
}
