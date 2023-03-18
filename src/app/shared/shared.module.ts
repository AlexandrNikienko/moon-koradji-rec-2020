import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../core/pipes/pipes.module';

import { SharedGalleryComponent } from './gallery/gallery.component';
import { SharedVideoComponent } from './video/video.component';
import { ReleaseCardComponent } from './release-card/release-card.component';
import { PictureComponent } from './picture/picture.component';

@NgModule({
	imports: [
		PipesModule,
		CommonModule,
		RouterModule
	],
	exports: [
		SharedGalleryComponent,
		SharedVideoComponent,
		ReleaseCardComponent,
		PictureComponent,
		RouterModule
	],
	declarations: [
		SharedGalleryComponent,
		SharedVideoComponent,
		ReleaseCardComponent,
		PictureComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {
}
