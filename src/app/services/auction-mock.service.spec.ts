import { TestBed } from '@angular/core/testing';

import { AuctionMockService } from './auction-mock.service';

describe('AuctionMockService', () => {
  let service: AuctionMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
