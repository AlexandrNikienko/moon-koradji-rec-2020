import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomePageComponent } from './home-page.component';
import { DataService } from '../core/services/data.service';
import { PodcastComponent } from './podcast/podcast.component';

const homeRoutes: Routes = [
	{
		path: '',
		component: HomePageComponent,
		pathMatch: 'full',
		data: {
			title: 'Home Page'
		}
	}
];

@NgModule({
	declarations: [
		HomePageComponent,
		PodcastComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(homeRoutes),
		SharedModule
	],
	exports: [
		RouterModule
	],
	providers: [
		DataService
	]
})

export class HomePageModule { }
