import { Routes } from '@angular/router';
import { ResourceExistsGuard } from './core/services/resource-exist-guard.service';
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
		loadChildren: './release/release.module#ReleaseModule',
		canActivate: [ResourceExistsGuard]
	},
	{
		path: 'artists',
		loadChildren: './artists/artists.module#ArtistsModule'
	},
	{
		path: 'artists/:artistRoute',
		loadChildren: './artist/artist.module#ArtistModule',
		canActivate: [ResourceExistsGuard]
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
		path: '404',
		component: LayoutNotFoundComponent
	},
  	{ 
		path: '**',
		redirectTo: '/404'
	}
];
