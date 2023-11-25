import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { RoleServiceService } from '../role-service.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

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

  // EmployeePlanObj = {
  //   employeeInvestmentID: 0,
  //   employeeID: 0,
  //   loginID: 0,
  //   planID : 0,
  //   statusID: 0,
  //   startDate:'',
  //   endDate:'',
  //   duration: 0,
  // }

  activeTab: string = 'current-plans';

  toggleTab(tabName: string) {
    this.activeTab = tabName;
  }

  EmployeeInvestmentPlanDetail: any[] = [];
  particularEmployeeData: any[] = [];

  Employess: any[] = [];
  planDetails: any;

  constructor(
    private routes: Router,
    private roleservice: RoleServiceService,
    private observer: BreakpointObserver,
    private http: HttpClient
  ) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width : 800px)']).subscribe((res) => {
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
    this.roleservice.getEmployeeInvestementData().subscribe((result) => {
      this.EmployeeInvestmentPlanDetail = result;
      console.log(
        'Employee Investment Plan Details',
        this.EmployeeInvestmentPlanDetail
      );

    });

    // this.particularEmployeeData.forEach(element =>{
    //   debugger;
    //   const startDate = element.startDate.substring(0,10);
    //   element.endDate = element.endDate.substring(0,10);

    //   console.log('Start Date',startDate);
    // });


    this.roleservice.getEmployeeData().subscribe((result) => {
      this.Employess = result;
      if (this.Employess != null) {
        const employee = this.Employess.find(
          (e) => e.email == localStorage.getItem('email')
        );
        console.log('THis is my data');
        console.log(employee);
        this.EmpObj = employee;

        const employeeInvestment = this.EmployeeInvestmentPlanDetail.filter(
          (investment) => investment.employeeID == this.EmpObj.employeeID
        );
        this.particularEmployeeData = employeeInvestment;
        //this.EmployeePlanObj = employeeInvestment;
        console.log('Employee investment plan detail', employeeInvestment);

        //combining Investment plan table with particularEmployeeData
        this.roleservice.getInvestmentPlans().subscribe(
          (planData) => {
            this.combineData(planData, employeeInvestment);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
    
  }

  formatDate(isoDateString: string){
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2,'0');
    const day = date.getDate().toString().padStart(2,'0');

    return `${day}-${month}-${year}`;
    
  }


  combineData(planData : any[], employeeInvestment: any[]){
    this.particularEmployeeData = employeeInvestment.map((investment)=>{
      const plandetails = planData.find((plandetails)=> plandetails.planID === investment.planID);
      if(plandetails){
        investment.planName = plandetails.planName;
      }
      return investment;
    });
  }

  

  fetchPlanName(planID: number): void {
    this.roleservice.getPlanNameById(planID).subscribe((result) => {
      this.planDetails = result;
    });
  }
}
