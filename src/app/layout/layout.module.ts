import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {VisualsComponent} from './visuals/visuals.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        VisualsComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        VisualsComponent,
        RouterModule
    ]
})

export class LayoutModule {}
