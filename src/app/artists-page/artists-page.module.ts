import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PipesModule} from '../core/pipes/pipes.module';

import {ArtistsPageComponent} from './artists-page.component';

import {ArtistsService} from '../core/services/artists.service';
import {DjsService} from '../core/services/djs.service';

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
        ArtistsService,
        DjsService
    ]
})

export class ArtistsModule {}
