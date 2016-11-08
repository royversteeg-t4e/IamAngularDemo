import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LockModule } from './lock/lock.module';
import { ErrorModule } from './error/error.module';

import { IamService } from './iam.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([], { useHash: true }),    
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http] 
    }),
    HomeModule,
    LockModule,
    ErrorModule
  ],
  providers: [
      IamService,    
        {
            provide: Http, 
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) =>
                {
                    if(!environment.production){
                        defaultOptions.withCredentials = true;
                    }
                    return new Http(backend, defaultOptions)
                }, 
            deps: [XHRBackend, RequestOptions]
        } ],        
  bootstrap: [AppComponent]
})
export class AppModule { }
