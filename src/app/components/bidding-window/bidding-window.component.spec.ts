import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingWindowComponent } from './bidding-window.component';

describe('BiddingWindowComponent', () => {
  let component: BiddingWindowComponent;
  let fixture: ComponentFixture<BiddingWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
