import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsWindowComponent } from './auctions-window.component';

describe('AuctionsWindowComponent', () => {
  let component: AuctionsWindowComponent;
  let fixture: ComponentFixture<AuctionsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionsWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
