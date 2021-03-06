import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from '../core/pipes/pipes.module';

import { ArtistPageComponent } from './artist-page.component';

import { DataService } from '../core/services/data.service';

const artistRoutes: Routes = [
	{
		path: '',
		component: ArtistPageComponent,
		pathMatch: 'full',
		data: {
			title: 'Artist Page'
		}
	}
];

@NgModule({
	declarations: [
		ArtistPageComponent
	],
	imports: [
		CommonModule,
		PipesModule,
		RouterModule.forChild(artistRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [
		DataService
	]
})

export class ArtistModule { }
