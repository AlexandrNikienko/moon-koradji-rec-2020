import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../core/pipes/pipes.module';

import { SharedGalleryComponent } from './gallery/gallery.component';
import { PictureComponent } from './picture/picture.component';

@NgModule({
	imports: [
		PipesModule,
		CommonModule,
		RouterModule,
		PictureComponent,
	],
	exports: [
		SharedGalleryComponent,
		PictureComponent,
		RouterModule
	],
	declarations: [
		SharedGalleryComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {
}
