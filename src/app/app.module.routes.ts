import { Routes } from '@angular/router';
import { LayoutNotFoundComponent } from './layout/not-found/layout-not-found.component';

export const appRoutes: Routes = [
	{
		path: 'index',
		loadChildren: './home-page/home-page.module#HomePageModule'
	},
	{
		path: 'releases',
		loadChildren: './releases/releases.module#ReleasesModule'
	},
	{
		path: 'releases/:releaseRoute',
		loadChildren: './release-page/release-page.module#ReleaseModule'
	},
	{
		path: 'artists',
		loadChildren: './artists-page/artists-page.module#ArtistsModule'
	},
	{
		path: 'artists/:artistRoute',
		loadChildren: './artist-page/artist-page.module#ArtistModule'
	},
	// {
	// 	path: 'merch',
	// 	loadChildren: './merch/merch.module#MerchModule'
	// },
	{
		path: 'podcasts',
		loadChildren: './podcasts-page/podcasts-page.module#PodcastsPageModule'
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
