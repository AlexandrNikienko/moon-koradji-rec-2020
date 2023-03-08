import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './core/pipes/pipes.module';
import { RouterModule } from '@angular/router';

import { appRoutes } from './app.module.routes';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeModule } from './home/home.module';
import { ReleaseModule } from './release/release.module';
import { ReleasesModule } from './releases/releases.module';
import { ArtistsModule } from './artists/artists.module';
import { ArtistModule } from './artist/artist.module';
import { MerchModule } from './merch/merch.module';
import { PodcastsModule } from './podcasts/podcasts.module';
import { AboutModule } from './about/about.module';
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
		MatToolbarModule,
		MatButtonModule,
		PipesModule,
		LayoutModule,
		HomeModule,
		ReleaseModule,
		ReleasesModule,
		ArtistsModule,
		ArtistModule,
		MerchModule,
		PodcastsModule,
		AboutModule
	],
	exports: [
		RouterModule,
		MatToolbarModule,
		MatButtonModule
	],
	providers: [
		Title
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
