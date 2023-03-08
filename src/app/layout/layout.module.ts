import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VisualsComponent } from './visuals/visuals.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		VisualsComponent,
		ScrollToTopComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		MatToolbarModule,
		MatButtonModule,
		MatTooltipModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		VisualsComponent,
		RouterModule,
		ScrollToTopComponent
	]
})

export class LayoutModule { }
