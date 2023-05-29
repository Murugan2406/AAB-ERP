import { TestBed } from '@angular/core/testing';

import { EbillService } from './ebill.service';

describe('EbillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EbillService = TestBed.get(EbillService);
    expect(service).toBeTruthy();
  });
});
