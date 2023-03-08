import { Routes } from '@angular/router';
import { ResourceExistsGuard } from './core/services/resource-exist-guard.service';
import { LayoutNotFoundComponent } from './layout/not-found/layout-not-found.component';

export const appRoutes: Routes = [
	{
		path: 'index',
		loadChildren: () => import('./home/home.module').then(x => x.HomeModule)
	},
	{
		path: 'releases',
		loadChildren: () => import('./releases/releases.module').then(x => x.ReleasesModule)
	},
	{
		path: 'releases/:releaseRoute',
		loadChildren: () => import('./release/release.module').then(x => x.ReleaseModule),
		canActivate: [ResourceExistsGuard]
	},
	{
		path: 'artists',
		loadChildren: () => import('./artists/artists.module').then(x => x.ArtistsModule)
	},
	{
		path: 'artists/:artistRoute',
		loadChildren: () => import('./artist/artist.module').then(x => x.ArtistModule),
		canActivate: [ResourceExistsGuard]
	},
	// {
	// 	path: 'merch',
	// 	loadChildren: './merch/merch.module#MerchModule'
	// },
	{
		path: 'podcasts',
		loadChildren: () => import('./podcasts/podcasts.module').then(x => x.PodcastsModule)
	},
	{
		path: 'about',
		loadChildren: () => import('./about/about.module').then(x => x.AboutModule)
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
