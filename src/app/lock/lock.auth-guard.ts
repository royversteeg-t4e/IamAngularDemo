import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { IamService } from '../iam.service';

import { Observable } from 'rxjs';

@Injectable()
export class LockAuthGaurd implements CanActivate  {  
  constructor(private iamService: IamService, private router: Router) { }

  canActivate() {
    return this.iamService.doIamRequest('examples/test_lib/get_memberships')
        .map(x=>
        {
            for(let membership of x.memberships) {
                if(membership.ref_name === "iam/administrators")
                    return true;
            }
            console.debug('not allowed');
            this.router.navigate(['authError']);
            return false;
        })
        .catch(x=>
        {
            console.debug('catch error');
            this.router.navigate(['authError']);
            return Observable.of(false);
        });
  }
}
