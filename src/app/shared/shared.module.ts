import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../core/pipes/pipes.module';

import { SharedGalleryComponent } from './gallery/gallery.component';
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
		ReleaseCardComponent,
		PictureComponent,
		RouterModule
	],
	declarations: [
		SharedGalleryComponent,
		ReleaseCardComponent,
		PictureComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {
}
