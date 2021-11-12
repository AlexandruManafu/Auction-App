import { TestBed } from '@angular/core/testing';

import { WindowToggleService } from './window-toggle.service';

describe('WindowToggleService', () => {
  let service: WindowToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
