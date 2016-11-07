import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';


import { IamService } from './iam.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
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
