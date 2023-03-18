import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app.module.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from './core/pipes/pipes.module';

// Layout
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ScrollToTopComponent } from './layout/scroll-to-top/scroll-to-top.component';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { LayoutNotFoundComponent } from './layout/not-found/layout-not-found.component';
import { VisualsComponent } from './layout/visuals/visuals.component';

@NgModule({
	declarations: [
		AppComponent
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
		HeaderComponent,
		FooterComponent,
		ScrollToTopComponent,
		VisualsComponent,
		LayoutNotFoundComponent,
		MatTooltipModule
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
