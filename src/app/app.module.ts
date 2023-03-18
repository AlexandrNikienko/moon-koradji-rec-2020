import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './core/pipes/pipes.module';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app.module.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeModule } from './home/home.module';
import { LayoutNotFoundComponent } from './layout/not-found/layout-not-found.component';

@NgModule({
	declarations: [
		AppComponent,
		LayoutNotFoundComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes, {
			useHash: !Boolean(history.pushState),
			scrollPositionRestoration: 'enabled'
		}),
		BrowserAnimationsModule,
		PipesModule,
		LayoutModule,
		HomeModule
	],
	exports: [
		RouterModule
	],
	providers: [
		Title
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
