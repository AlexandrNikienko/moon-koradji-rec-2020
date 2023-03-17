import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const aboutRoutes: Routes = [
	{
		path: '',
		component: AboutComponent,
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(aboutRoutes),
		AboutComponent
	]
})

export class AboutModule {
}
