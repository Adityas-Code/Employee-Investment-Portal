import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeInvestmentsComponent } from './manage-employee-investments.component';

describe('ManageEmployeeInvestmentsComponent', () => {
  let component: ManageEmployeeInvestmentsComponent;
  let fixture: ComponentFixture<ManageEmployeeInvestmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEmployeeInvestmentsComponent]
    });
    fixture = TestBed.createComponent(ManageEmployeeInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
