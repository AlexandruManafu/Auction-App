import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingTimeoutComponent } from './bidding-timeout.component';

describe('BiddingTimeoutComponent', () => {
  let component: BiddingTimeoutComponent;
  let fixture: ComponentFixture<BiddingTimeoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingTimeoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
