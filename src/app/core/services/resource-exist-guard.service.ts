import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class ResourceExistsGuard implements Resolve<any> {
	constructor(
		private dataService: DataService,
		private router: Router
	) {}
  
	resolve(route: ActivatedRouteSnapshot): boolean {
		this.dataService.existingPramas.subscribe(items => {
			const param = Object.values(route.params)[0];
			const resourceExists = !!items.find(item => item === param);

			if (!resourceExists) {
				this.router.navigate(['/404']);
			}
		});

		return true;
	}
}
  