import { TestBed } from '@angular/core/testing';

import { CtgovApiService } from './ctgov-api.service';

describe('CtgovApiService', () => {
  let service: CtgovApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtgovApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
