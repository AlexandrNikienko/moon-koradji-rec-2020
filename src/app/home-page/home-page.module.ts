import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomePageComponent } from './home-page.component';
import { DiscographyService } from '../core/services/discography.service';
import { NewsService } from '../core/services/news.service';
import { ReleaseCardComponent } from './release-card/release-card.component';
// import { FacebookModule } from 'ngx-facebook';

const homeRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full',
        data: {
            title: 'Home Page'
        }
    }
];

@NgModule({
    declarations: [
        HomePageComponent,
        ReleaseCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(homeRoutes),
        // FacebookModule.forRoot(),
        SharedModule
    ],
    exports: [
        RouterModule
    ],
    providers: [
        DiscographyService,
        NewsService
    ]
})

export class HomePageModule { }
