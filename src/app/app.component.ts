import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	constructor(private router: Router,
		private titleService: Title) {
	}

	ngOnInit() {
		// this.router.events
		// 	.pipe(
		// 		filter(event => event instanceof NavigationEnd))
		// 	.subscribe((event: NavigationEnd) => {
		// 		const titleToSet = this.getDeepestTitle(this.router.routerState.snapshot.root);

		// 		if (titleToSet) {
		// 			this.titleService.setTitle(titleToSet);
		// 		}
		// 	});
	}

	// private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {

	// 	let title = routeSnapshot.data ? routeSnapshot.data['title'] : undefined;

	// 	if (routeSnapshot.firstChild) {
	// 		title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
	// 	}

	// 	return title;
	// }
}
