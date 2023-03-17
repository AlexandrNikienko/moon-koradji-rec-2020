import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
	imports: [
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
