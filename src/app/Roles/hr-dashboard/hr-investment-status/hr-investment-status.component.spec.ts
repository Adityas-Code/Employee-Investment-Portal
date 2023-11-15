import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInvestmentStatusComponent } from './hr-investment-status.component';

describe('HrInvestmentStatusComponent', () => {
  let component: HrInvestmentStatusComponent;
  let fixture: ComponentFixture<HrInvestmentStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrInvestmentStatusComponent]
    });
    fixture = TestBed.createComponent(HrInvestmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
