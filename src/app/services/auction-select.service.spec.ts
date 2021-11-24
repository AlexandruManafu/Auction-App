import { TestBed } from '@angular/core/testing';

import { AuctionSelectService } from './auction-select.service';

describe('AuctionSelectService', () => {
  let service: AuctionSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
