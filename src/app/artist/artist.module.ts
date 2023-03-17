import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtistComponent } from './artist.component';
import { DataService } from '../core/services/data.service';

const artistRoutes: Routes = [
	{
		path: '',
		component: ArtistComponent,
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(artistRoutes),
		ArtistComponent
	],
	exports: [
		RouterModule
	],
	providers: [
		DataService
	]
})

export class ArtistModule { }
