import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ReleasesComponent } from './releases.component';
import { DiscographyService } from '../core/services/discography.service';


const releasesRoutes: Routes = [
  {
    path: '',
    component: ReleasesComponent,
    pathMatch: 'full',
    data: {
      title: 'Releases Page'
    }
  }
];

@NgModule({
  declarations: [
    ReleasesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(releasesRoutes),
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DiscographyService
  ]
})
export class ReleasesModule { }
