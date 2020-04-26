import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {VisualsComponent} from './visuals/visuals.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule}  from '@angular/material/button';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        VisualsComponent
    ],
    imports: [
        CommonModule,
		RouterModule,
		MatToolbarModule,
        MatButtonModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        VisualsComponent,
        RouterModule
    ]
})

export class LayoutModule {}
