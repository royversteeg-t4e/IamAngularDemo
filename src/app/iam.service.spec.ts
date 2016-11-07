/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IamService } from './iam.service';

describe('Service: Iam', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IamService]
    });
  });

  it('should ...', inject([IamService], (service: IamService) => {
    expect(service).toBeTruthy();
  }));
});
