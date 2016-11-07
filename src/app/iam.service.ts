import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class IamService {
  private serverUrl: string = environment.production ? '/' : 'http://localhost/';
  private baseUrl: string = 'func/';
  private isAuthenticated: boolean = false;
  private authObservable: Observable<boolean>;

  constructor(private http: Http) { }

  authenticate() {
    if(this.isAuthenticated)
      return Observable.of(true);
    if (!this.authObservable) {      
      this.authObservable = this.http.get(this.serverUrl + "authenticate/")
        .map(this.handleAuthResponse).share();
    }
    return this.authObservable;
  }

  private renewAuthentication() {
    this.http.get(this.serverUrl + "authenticate/renew/")
      .map(this.handleAuthResponse)
      .subscribe();
  }

  private handleAuthResponse(response) {    
    if(response.ok) {      
      this.isAuthenticated = true;
      let responseData = response.json();
      var expiration = new Date(responseData.exp * 1000);
      var dif = expiration.getTime() - new Date().getTime();
      //Request again after 3/4th of the expiration time;
      var renew = dif / 4 * 3;
      if (renew > 0) {
          console.debug("renew after " + renew + " ms");
          setTimeout(() => this.renewAuthentication(), renew);
      }
      return true;
    }
    else {
      this.handleAuthError(response);
      throw {error:"Invalid response", response: response};
    }
  }

  private handleAuthError(response) {
    this.isAuthenticated = false;    
    console.log("http error: " + response.status);
    if (response.status === 401) {
        console.log("not authenticated");        
    } else if (response.status === 403) {        
        console.log("forbidden");
    } else if (response.status === 500) {        
        console.log("server error while authenticating");
    } else {
        console.log(`unknown error: ${response.statusText}`);
    }
  }

  doIamRequest(url, params = {}, app = "APP_NAME") {
        let body = JSON.stringify({ "params": params, "app": app});
        function parseDates(key, value) {            
            if (typeof value === 'string') {
                let match = /^(\d{4})-(\d{2})-(\d{2})(?: (\d{2}):(\d{2}):(\d{2}))?$/.exec(value);
                if (match) {
                    return new Date(Date.UTC(+match[1], +match[2] - 1, +match[3], match[4] ? +match[4] : 0, match[5] ? +match[5] : 0 , match[6] ? +match[6] : 0));
                }
            }
            return value;
        };

        return this.authenticate()
          .flatMap(
            (authenticated) =>
            {
              if(authenticated) {
                return this.http.post(this.serverUrl + this.baseUrl + url, body).map(res => JSON.parse(res.text(), parseDates).params)
              }
              throw "Error authenticating";
            }
          );
    }
}
