import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ReleasesComponent } from './releases.component';
import { DataService } from '../core/services/data.service';


const releasesRoutes: Routes = [
	{
		path: '',
		component: ReleasesComponent,
		pathMatch: 'full',
		data: {
			title: 'Our Catalogue | Moon Koradji Records'
		}
	}
];

@NgModule({
	declarations: [
		ReleasesComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(releasesRoutes),
		SharedModule
	],
	exports: [
		RouterModule
	],
	providers: [
		DataService
	]
})
export class ReleasesModule { }
