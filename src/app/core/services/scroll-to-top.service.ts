import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Utils } from '../utils';

@Injectable({
	providedIn: 'root',
})
export class ScrollTopService {
	constructor(private router: Router) {
		this.init();
	}

	init(): void {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				window.scrollY && Utils.scrollToTop();
			});
	}
}
