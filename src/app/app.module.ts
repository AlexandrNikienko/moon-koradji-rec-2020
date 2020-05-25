


import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PipesModule} from './core/pipes/pipes.module';
import {RouterModule} from '@angular/router';

import {appRoutes} from './app.module.routes';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule}  from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {HomePageModule} from './home-page/home-page.module';
import {ReleaseModule} from './release-page/release-page.module';
import {ReleasesModule} from './releases/releases.module';
import {ArtistsModule} from './artists-page/artists-page.module';
import {ArtistModule} from './artist-page/artist-page.module';
import {MerchModule} from './merch/merch.module';
import {PodcastsPageModule} from './podcasts-page/podcasts-page.module';
import {AboutModule} from './about/about.module';
import {LayoutNotFoundComponent} from './layout/not-found/layout-not-found.component';

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
        HomePageModule,
        ReleaseModule,
        ReleasesModule,
        ArtistsModule,
        ArtistModule,
        MerchModule,
        PodcastsPageModule,
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
export class AppModule {}
