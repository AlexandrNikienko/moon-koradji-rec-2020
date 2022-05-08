import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from '../core/pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

import { PodcastsComponent } from './podcasts.component';

import { DataService } from '../core/services/data.service';

const artistRoutes: Routes = [
	{
		path: '',
		component: PodcastsComponent,
		pathMatch: 'full',
		data: {
			title: 'Podcasts'
		}
	}
];

@NgModule({
	declarations: [
		PodcastsComponent
	],
	imports: [
		CommonModule,
		PipesModule,
		RouterModule.forChild(artistRoutes),
		SharedModule
	],
	exports: [
		RouterModule,
	],
	providers: [
		DataService
	]
})

export class PodcastsModule { }
