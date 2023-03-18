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
		loadComponent: () => import('./releases/releases.component').then(x => x.ReleasesComponent)
	},
	{
		path: 'releases/:releaseRoute',
		loadComponent: () => import('./release/release.component').then(x => x.ReleaseComponent),
		canActivate: [ResourceExistsGuard]
	},
	{
		path: 'artists',
		loadComponent: () => import('./artists/artists.component').then(x => x.ArtistsComponent)
	},
	{
		path: 'artists/:artistRoute',
		loadComponent: () => import('./artist/artist.component').then(x => x.ArtistComponent),
		canActivate: [ResourceExistsGuard]
	},
	{
		path: 'podcasts',
		loadComponent: () => import('./podcasts/podcasts.component').then(x => x.PodcastsComponent)
	},
	{
		path: 'about',
		loadComponent: () => import('./about/about.component').then(x => x.AboutComponent)
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
