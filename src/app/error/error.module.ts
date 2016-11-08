import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { AuthenticationErrorComponent } from './authentication-error/authentication-error.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'error', component: ErrorComponent
      },
      {
        path:'authError', component: AuthenticationErrorComponent
      },
      {
        path:'**',
        component: NotFoundComponent
      }
    ])
  ],
  declarations: [ErrorComponent, AuthenticationErrorComponent, NotFoundComponent]
})
export class ErrorModule { }
