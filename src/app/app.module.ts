import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app.module.routes';

import { PipesModule } from './core/pipes/pipes.module';

// Layout
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ScrollToTopComponent } from './layout/scroll-to-top/scroll-to-top.component';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes, {
			useHash: !Boolean(history.pushState),
			scrollPositionRestoration: 'enabled'
		}),
		PipesModule,
		HeaderComponent,
		FooterComponent,
		ScrollToTopComponent,
		MatTooltipModule
	],
	exports: [
		RouterModule
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
