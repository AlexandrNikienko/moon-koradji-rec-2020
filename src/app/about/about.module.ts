import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const aboutRoutes: Routes = [
	{
		path: '',
		component: AboutComponent,
		pathMatch: 'full',
		data: {
			title: 'Our Mission at Moon Koradji Records'
		}
	}
];

@NgModule({
	declarations: [
		AboutComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(aboutRoutes)
	],
	exports: [
		AboutComponent
	]
})

export class AboutModule {
}
