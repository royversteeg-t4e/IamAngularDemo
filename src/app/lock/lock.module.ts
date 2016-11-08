import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LockComponent } from './lock.component';
import { LockAuthGaurd } from './lock.auth-guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"lock",
        component: LockComponent,
        canActivate: [LockAuthGaurd]
      }
    ])
  ],
  declarations: [LockComponent],
  providers: [LockAuthGaurd]
})
export class LockModule { }
