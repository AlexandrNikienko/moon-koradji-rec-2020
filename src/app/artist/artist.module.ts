import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from '../core/pipes/pipes.module';

import { ArtistComponent } from './artist.component';

import { DataService } from '../core/services/data.service';

const artistRoutes: Routes = [
	{
		path: '',
		component: ArtistComponent,
		pathMatch: 'full',
		data: {
			title: 'Artist Page | Moon Koradji Records'
		}
	}
];

@NgModule({
	declarations: [
		ArtistComponent
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
