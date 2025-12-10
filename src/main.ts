import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withNavigationErrorHandler } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { environment } from './environments/environment';
import { routes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideZoneChangeDetection(),provideRouter(
			routes,
			withNavigationErrorHandler((error) => {
				console.error('Navigation error:', error);
			}
	)),
		importProvidersFrom(BrowserAnimationsModule),
		provideHttpClient()
	]
}).catch(err => console.error(err));
