import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MerchComponent} from './merch.component';

const merchRoutes: Routes = [
    {
        path: '',
        component: MerchComponent,
        pathMatch: 'full',
        data: {
            title: 'Merchandise Page'
        }
    }
];

@NgModule({
    declarations: [
        MerchComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(merchRoutes)
    ],
    exports: [
        MerchComponent
    ]
})

export class MerchModule {
}
