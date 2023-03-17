import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from '../core/pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

import { ReleaseComponent } from './release.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { HeadingComponent } from './../layout/heading/heading.component';

const releaseRoutes: Routes = [
	{
		path: '',
		component: ReleaseComponent,
		pathMatch: 'full',
		data: {
			title: ''
		}
	}
];

@NgModule({
	declarations: [
		ReleaseComponent,
		AudioPlayerComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		PipesModule,
		RouterModule.forChild(releaseRoutes),
		SharedModule,
		HeadingComponent
	],
	exports: [
		RouterModule
	]
})

export class ReleaseModule {
}
