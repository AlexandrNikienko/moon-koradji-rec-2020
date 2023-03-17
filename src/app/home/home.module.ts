import { HeadingComponent } from './../layout/heading/heading.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { DataService } from '../core/services/data.service';
import { PodcastComponent } from './podcast/podcast.component';

const homeRoutes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full',
		data: {
			title: ''
		}
	}
];

@NgModule({
	declarations: [
		HomeComponent,
		PodcastComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(homeRoutes),
		SharedModule,
		HeadingComponent
	],
	exports: [
		RouterModule
	],
	providers: [
		DataService
	]
})

export class HomeModule { }
