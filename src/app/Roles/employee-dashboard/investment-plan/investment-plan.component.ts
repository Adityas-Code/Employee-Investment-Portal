import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { RoleServiceService } from '../../role-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-investment-plan',
  templateUrl: './investment-plan.component.html',
  styleUrls: ['./investment-plan.component.css'],
})
export class InvestmentPlanComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  //EmployeeID, PlanID, StatusID, Duration
  duration:number = 0;
  investmentPlans: any[] = [];
  durations:number[]=[];

  EmpObj: any = {
    employeeID: '',
    name: '',
    email: '',
    age: '',
    gender: '',
    department: '',
    contactDetails: '',
    salary: '',
  };

  enrollmentData = {
    employeeInvestmentID: 0,
    employeeID: '',
    loginID: '',
    planID : 0,
    statusID: 0,
    startDate:null,
    endDate:null,
    duration: 0,
  };

  LoginObj: any = {
    loginID: '',
    roleID: '',
    username: '',
    email: '',
    password: '',
  };

  Employess: any[] = [];
  LoginDetails: any[] = [];

  constructor(
    private roleService: RoleServiceService,
    private toastr: ToastrService,
    private observer: BreakpointObserver
  ) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width : 800px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  ngOnInit(): void {
    this.fetchInvestmentPlans();

    this.roleService.getEmployeeData().subscribe((result) => {
      this.Employess = result;
      if (this.Employess != null) {
        const employee = this.Employess.find(
          (e) => e.email == localStorage.getItem('email')
        );
        console.log('THis is my data');
        console.log(employee);
        this.EmpObj = employee;
      }
    });

    this.roleService.getList().subscribe((result) => {
      this.LoginDetails = result;
      if (this.LoginDetails != null) {
        const login = this.LoginDetails.find(
          (e) => e.email == localStorage.getItem('email')
        );
        console.log(login);
        this.LoginObj = login;
      }
    });
    this.durations = new Array(this.investmentPlans.length).fill(null);
    

    //  this.employeeID = this.roleService.getEmployeeID();
  }
  fetchInvestmentPlans(): void {
    this.roleService.getInvestmentPlans().subscribe((plan)=>{
      this.investmentPlans = plan;
    },
    (error) => {
      console.error('Error fetching investment plans:', error);
    }
    );
  }

  // {
  //   "employeeInvestmentID": 4,
  //   "employeeID": 3,
  //   "loginID": 0,
  //   "planID": 1,
  //   "statusID": 2,
  //   "startDate": null,
  //   "endDate": null,
  //   "duration": 2
  // }
  enroll(planId: number, duration: number) {
    
      this.enrollmentData.employeeID= this.EmpObj.employeeID,
      this.enrollmentData.loginID = this.LoginObj.loginID,
      this.enrollmentData.planID = planId,
      this.enrollmentData.statusID = 2,
      this.enrollmentData.startDate = null,
      this.enrollmentData.endDate = null,
      this.enrollmentData.duration = duration,
    

    this.roleService.enrollInvestment(this.enrollmentData).subscribe({
      next:(response) => {
        this.toastr.success('Enrolled successfully');
      },
      error:(error) => {
        this.toastr.error('Error');
      }
    });
  }
}
