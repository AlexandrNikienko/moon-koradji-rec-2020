import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedGalleryComponent } from './gallery.component';
import { PictureComponent } from '../picture/picture.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		PictureComponent
	],
	exports: [
		SharedGalleryComponent,
		RouterModule
	],
	declarations: [
		SharedGalleryComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class GalleryModule {
}
