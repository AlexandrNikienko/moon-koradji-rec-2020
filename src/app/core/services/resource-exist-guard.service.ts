import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class ResourceExistsGuard  {
	constructor(
		private dataService: DataService,
		private router: Router
	) {}
  
	resolve(route: ActivatedRouteSnapshot): boolean {
		this.dataService.existingParams.subscribe(items => {
			const param = Object.values(route.params)[0];
			const resourceExists = !!items.find(item => item === param);

			if (!resourceExists) {
				this.router.navigate(['/404']);
			}
		});

		return true;
	}
}
  