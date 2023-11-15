import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css'],
})
export class HrDashboardComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  investmentPlans: any[] = [];
  employees: any[] = [];
  drillDownData: any[] = [];
  showGradeCategory: boolean = false;
  showGradeA: boolean = true;
  showGradeB: boolean = true;
  showGradeC: boolean = true;
  showGenderCategory: boolean = false;
  showGenderF: boolean = true;
  showGenderM: boolean = true;
  showPlanCategory: boolean = false;
  showPlanId1: boolean = true;
  showPlanId2: boolean = true;
  showPlanId3: boolean = true;
  showAgeCategory: boolean = false;
  showAgeUnder30: boolean = true;
  showAge31to40: boolean = true;
  showAge41to50: boolean = true;
  showAge51to60: boolean = true;
  filteredCount: number = 0;
  showTable: boolean = false;

  constructor(private observer: BreakpointObserver, private http: HttpClient) {}

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
    this.fetchInvestmentPlans();
    this.fetchDrillDownData();
  }

  fetchInvestmentPlans() {
    this.http
      .get<any>('http://localhost:52830/api/EmployeeInvestments')
      .subscribe((data) => {
        this.investmentPlans = this.processInvestmentPlans(data);
      });
  }

  processInvestmentPlans(data: any[]): any[] {
    const plans: any[] = [];

    // Process the data and extract the plan ID and duration information
    data.forEach((item) => {
      const planId = item.planID;
      const duration = item.duration;

      // Check if the plan already exists in the plans array
      const existingPlan = plans.find(
        (plan) => plan.planId === planId && plan.duration === duration
      );

      if (existingPlan) {
        // If the plan already exists, increment the number of employees
        existingPlan.numEmployees++;
      } else {
        // If the plan doesn't exist, create a new plan object
        const newPlan = {
          planId: planId,
          duration: duration,
          numEmployees: 1,
        };

        plans.push(newPlan);
      }
    });

    return plans;
  }

  getPlanName(planId: number): string {
    switch (planId) {
      case 1:
        return 'Employee Contribution Plan';
      case 2:
        return 'Company Contribution Plan';
      case 3:
        return 'Retirement Plan';
      default:
        return 'Unknown Plan';
    }
  }

  fetchDrillDownData() {
    this.http.get<any>('http://localhost:52830/api/Employees')
      .subscribe(employeesData => {
        this.http.get<any>('http://localhost:52830/api/EmployeeInvestments')
          .subscribe(investmentsData => {
            this.combineData(employeesData, investmentsData);
          });
      });
  }

  combineData(employeesData: any[], investmentsData: any[]) {
    this.drillDownData = employeesData.map(employee => {
      const investment = investmentsData.find(investment => investment.employeeID === employee.employeeID);
      return {
        employeeID: employee.employeeID,
        name: employee.name,
        age: employee.age,
        gender: employee.gender,
        grade: employee.grade,
        planID: investment ? investment.planID : '',
        statusID: investment ? investment.statusID : '',
        startDate: investment ? investment.startDate : '',
        endDate: investment ? investment.endDate : '',
        duration: investment ? investment.duration : ''
      };
    });
    this.filteredCount = this.drillDownData.length;
  }

  filterData() {
    this.drillDownData = this.drillDownData.filter(employee => {
      let showEmployee = true;
 
      if (this.showGradeCategory) {
        if ((!this.showGradeA && employee.grade === 'A') ||
            (!this.showGradeB && employee.grade === 'B') ||
            (!this.showGradeC && employee.grade === 'C')) {
          showEmployee = false;
        }
      }
 
      if (this.showGenderCategory) {
        if ((!this.showGenderF && employee.gender === 'F') ||
            (!this.showGenderM && employee.gender === 'M')) {
          showEmployee = false;
        }
      }
 
      if (this.showPlanCategory) {
        if ((!this.showPlanId1 && employee.planID === 1) ||
            (!this.showPlanId2 && employee.planID === 2) ||
            (!this.showPlanId3 && employee.planID === 3)) {
          showEmployee = false;
        }
      }
 
      if (this.showAgeCategory) {
        if ((!this.showAgeUnder30 && employee.age < 30) ||
            (!this.showAge31to40 && (employee.age >= 31 && employee.age <= 40)) ||
            (!this.showAge41to50 && (employee.age >= 41 && employee.age <= 50)) ||
            (!this.showAge51to60 && (employee.age >= 51 && employee.age <= 60))) {
          showEmployee = false;
        }
      }
 
      return showEmployee;
    });
    this.filteredCount = this.drillDownData.length;
  }




}
