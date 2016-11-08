import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
      path: '',
      pathMatch: 'full',
      redirectTo: '/home'
    },
      {
        path:"home",
        component: HomeComponent
      }
    ]),
    TranslateModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
