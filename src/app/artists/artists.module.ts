import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from '../core/pipes/pipes.module';

import { ArtistsComponent } from './artists.component';

import { DataService } from '../core/services/data.service';

const artistsRoutes: Routes = [
	{
		path: '',
		component: ArtistsComponent,
		pathMatch: 'full',
		data: {
			title: 'Innovative Sounds of Psychedelic Trance: Meet Our Talented Artists and DJs'
		}
	}
];

@NgModule({
	declarations: [
		ArtistsComponent
	],
	imports: [
		CommonModule,
		PipesModule,
		RouterModule.forChild(artistsRoutes)
	],
	exports: [
		RouterModule
	],
	providers: [
		DataService
	]
})

export class ArtistsModule { }
