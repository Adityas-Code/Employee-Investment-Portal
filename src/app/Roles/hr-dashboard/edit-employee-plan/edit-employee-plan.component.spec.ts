import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeePlanComponent } from './edit-employee-plan.component';

describe('EditEmployeePlanComponent', () => {
  let component: EditEmployeePlanComponent;
  let fixture: ComponentFixture<EditEmployeePlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmployeePlanComponent]
    });
    fixture = TestBed.createComponent(EditEmployeePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
