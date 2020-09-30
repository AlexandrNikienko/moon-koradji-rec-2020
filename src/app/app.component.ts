import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	public winter: boolean;

	constructor(private router: Router,
		private titleService: Title) {
	}

	ngOnInit() {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				const titleToSet = this.getDeepestTitle(this.router.routerState.snapshot.root);

				if (titleToSet) {
					this.titleService.setTitle(titleToSet);
				}
			});

		this.checkIfWinter();
	}

	checkIfWinter(): void {
		const date = new Date;
		const winter = [11, 0, 1]; // Dec, Jan, Feb
		const month = date.getMonth();
		this.winter = winter.includes(month);
	}

	setTitle(newTitle: string) {
		this.titleService.setTitle(newTitle);
	}

	private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {

		let title = routeSnapshot.data ? routeSnapshot.data['title'] : undefined;

		if (routeSnapshot.firstChild) {
			title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
		}

		return title;
	}
}
