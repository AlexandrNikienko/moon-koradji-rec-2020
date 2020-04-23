import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PipesModule} from '../core/pipes/pipes.module';

import {ArtistsPageComponent} from './artists-page.component';

import { DataService } from '../core/services/data.service';

const artistsRoutes: Routes = [
    {
        path: '',
        component: ArtistsPageComponent,
        pathMatch: 'full',
        data: {
            title: 'Artists Page'
        }
    }
];

@NgModule({
    declarations: [
        ArtistsPageComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        RouterModule.forChild(artistsRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        DataService
    ]
})

export class ArtistsModule {}
