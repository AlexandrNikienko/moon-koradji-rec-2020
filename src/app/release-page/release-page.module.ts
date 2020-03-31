import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PipesModule} from '../core/pipes/pipes.module';
import {SharedModule} from '../shared/shared.module';

import {ReleasePageComponent} from './release-page.component';
import {AudioPlayerComponent} from './audio-player/audio-player.component';

const releaseRoutes: Routes = [
    {
        path: '',
        component: ReleasePageComponent,
        pathMatch: 'full',
        data: {
            title: 'Release Page'
        }
    }
];

@NgModule({
    declarations: [
        ReleasePageComponent,
        AudioPlayerComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule,
        RouterModule.forChild(releaseRoutes),
        SharedModule
    ],
    exports: [
        RouterModule
    ]
})

export class ReleaseModule {
}
