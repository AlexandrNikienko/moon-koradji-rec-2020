import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ScrollToTopComponent } from './layout/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { DataService } from './core/services/data.service';

@Component({
	standalone: true,
	imports: [
		HttpClientModule,
		RouterModule,
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

}
