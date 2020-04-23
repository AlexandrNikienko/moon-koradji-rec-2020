import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomePageComponent } from './home-page.component';
import { DataService } from '../core/services/data.service';
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
        HomePageComponent
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
        DataService
    ]
})

export class HomePageModule { }
