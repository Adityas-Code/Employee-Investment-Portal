import { Component , OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { RoleServiceService } from '../role-service.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
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

  Employess: any[] = [];

  investmentPlans: any[] = [];
  EmployeeTable:any[] = [];

  numberOfEmployees: any;
  numberOfLogins: number = 0;
  numberOfEnrollments: number = 0;
  activePlans: number = 0;

  constructor(private http: HttpClient, private observer: BreakpointObserver, private roleservice: RoleServiceService) {}
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

    this.fetchNumberOfEmployees();
    this.fetchNumberOfLogins();
    this.fetchNumberOfEnrollments();
    this.fetchActivePlans();

    this.roleservice.getEmployeeData().subscribe((result) =>{
      this.Employess = result;

      if(this.Employess != null){
        const employee = this.Employess.find((e) => e.email == localStorage.getItem('email'));
        this.EmpObj = employee;
        console.log(employee);
      }
      
    });

  }

  fetchNumberOfEmployees():void{
    debugger
    this.http.get<any[]>('http://localhost:52830/api/Employees').subscribe(
      (employees) => {
        this.EmployeeTable = employees;
        this.numberOfEmployees = this.EmployeeTable.length;
        console.log(this.numberOfEmployees);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  fetchNumberOfLogins():void{
    this.roleservice.getList().subscribe((logins) =>{
      this.numberOfLogins = logins.length;
    },
    (error) =>{
      console.error('Error fetching logins:', error);
    }
    );
  }

  fetchNumberOfEnrollments():void{
    this.roleservice.getEmployeeInvestementData().subscribe((enrollments) =>{

      this.numberOfEnrollments = enrollments.reduce((count:any, enrollment:any) =>{
        console.log('Enrollment:', enrollment);

        if (enrollment.statusID === 1) {
          return count + 1;
        }
        return count;
      },0);

      console.log('Number of Enrollments:', this.numberOfEnrollments);

    },
    (error)=>{
      console.error('Error fetching enrollments:', error);
    });
  }

  fetchActivePlans():void{
    this.roleservice.getInvestmentPlans().subscribe((activePlans)=>{
      console.log('Active Plans:', activePlans); // Log the active plans data
 
        // Count the number of active plans
      this.activePlans = activePlans.length;

      console.log('Number of Active Plans:', this.activePlans); // Log the final count
    },
    (error)=>{
      console.error('Error fetching active plans:', error);
    }
    );
  }




  /////////////////////////

  fetchInvestmentPlans(): void {
    this.http.get<any[]>('http://localhost:52830/api/InvestmentPlans').subscribe(
      (plans) => {
        this.investmentPlans = plans;
      },
      (error) => {
        console.error('Error fetching investment plans:', error);
      }
    );
  }

  updateSelectedPlans(): void {
    const selectedPlans = this.investmentPlans.filter(plan => plan.selected);
    this.http.post('http://localhost:52830/api/InvestmentPlans', selectedPlans).subscribe(
      () => {
        console.log('Selected plans updated successfully');
      },
      (error) => {
        console.error('Error updating selected plans:', error);
      }
    );
  }

  isRetirementPlan(plan: any): boolean {
    return plan.name === 'Retirement Plan' && plan.age === 60;
  }
}
