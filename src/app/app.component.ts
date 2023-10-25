import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ScrollToTopComponent } from './layout/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { DataService } from './core/services/data.service';
import { CommonModule } from '@angular/common';

@Component({
	standalone: true,
	imports: [
		HttpClientModule,
		RouterModule,
		CommonModule,
		HeaderComponent,
		FooterComponent,
		ScrollToTopComponent,
		MatTooltipModule
	],
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers: [DataService]
})
export class AppComponent {
	showBackground = true;

	constructor(private router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
			  this.showBackground = this.router.url !== '/podcasts';
			}
		  });
	}
}
