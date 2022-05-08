import { Routes } from '@angular/router';
import { LayoutNotFoundComponent } from './layout/not-found/layout-not-found.component';

export const appRoutes: Routes = [
	{
		path: 'index',
		loadChildren: './home/home.module#HomeModule'
	},
	{
		path: 'releases',
		loadChildren: './releases/releases.module#ReleasesModule'
	},
	{
		path: 'releases/:releaseRoute',
		loadChildren: './release/release.module#ReleaseModule'
	},
	{
		path: 'artists',
		loadChildren: './artists/artists.module#ArtistsModule'
	},
	{
		path: 'artists/:artistRoute',
		loadChildren: './artist/artist.module#ArtistModule'
	},
	// {
	// 	path: 'merch',
	// 	loadChildren: './merch/merch.module#MerchModule'
	// },
	{
		path: 'podcasts',
		loadChildren: './podcasts/podcasts.module#PodcastsModule'
	},
	{
		path: 'about',
		loadChildren: './about/about.module#AboutModule'
	},
	{
		path: '**',
		component: LayoutNotFoundComponent
	}
];
