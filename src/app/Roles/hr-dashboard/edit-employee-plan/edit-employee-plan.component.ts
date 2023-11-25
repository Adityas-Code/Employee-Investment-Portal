import { Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';


import { RoleServiceService } from '../../role-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-employee-plan',
  templateUrl: './edit-employee-plan.component.html',
  styleUrls: ['./edit-employee-plan.component.css']
})
export class EditEmployeePlanComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  employeeID:number = 0;
  planID:number = 0;
  employeeInvestmentID:number = 0;
  employee:any;
  planDetails:any;

  employeeInvestment:any;

  pendingRequest:any[]= [];

  EmployeePlanObj = {
    employeeInvestmentID: 0,
    employeeID: 0,
    loginID: 0,
    planID : 0,
    statusID: 0,
    startDate:'',
    endDate:'',
    duration: 0,
  }


  constructor(private http:HttpClient,private roleservice: RoleServiceService, private routes:Router, private route:ActivatedRoute, private toastr: ToastrService, private observer: BreakpointObserver){}

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

    this.route.paramMap.subscribe((params:any) =>{
      this.employeeID  = +params.get('employeeID');
      this.planID = +params.get('planID');
      this.employeeInvestmentID = +params.get('employeeInvestmentID');
      this.EmployeePlanObj.duration = +params.get('duration');
      console.log('Employee ID:',this.employeeID );
      console.log('Plan ID:',this.planID );
      console.log('Employee Investment ID:',this.employeeInvestmentID );
      console.log('Duration',this.EmployeePlanObj.duration);
    });

    this.roleservice.getEmployeeDataById(this.employeeID).subscribe((result) =>{
      this.employee = result;
    });

    this.roleservice.getPlanNameById(this.planID).subscribe((result)=>{
      this.planDetails = result;
    });

    this.http.get(`http://localhost:52830/api/EmployeeInvestmentsNew/${this.employeeInvestmentID}`).subscribe((result)=>{
      this.employeeInvestment = result;
    });
    
  }

  approveInvestmentPlan(): void {

    const currentDateTime = new Date();
    const endDate = new Date(currentDateTime.getFullYear() + this.EmployeePlanObj.duration,currentDateTime.getMonth(), currentDateTime.getDate());

    this.EmployeePlanObj.employeeInvestmentID =  this.employeeInvestmentID;
    this.EmployeePlanObj.employeeID = this.employeeID;
    this.EmployeePlanObj.planID = this.planID;
    this.EmployeePlanObj.statusID = 1;
    this.EmployeePlanObj.startDate = currentDateTime.toISOString();
    this.EmployeePlanObj.endDate = endDate.toISOString();
    
    console.log(this.EmployeePlanObj);

    this.http.put<any>(`http://localhost:52830/api/EmployeeInvestments/${this.employeeInvestmentID}`,this.EmployeePlanObj).subscribe({
      next:(response)=>{
        this.toastr.success('Plan Approved');
      },
      error:(error) =>{
        this.toastr.error('Error');
      }
    });
    
  }
  declineInvestmentPlan():void{
    
    const currentDateTime  = new Date();
    this.EmployeePlanObj.employeeInvestmentID =  this.employeeInvestmentID;
    this.EmployeePlanObj.employeeID = this.employeeID;
    this.EmployeePlanObj.planID = this.planID;
    this.EmployeePlanObj.statusID = 3;
    this.EmployeePlanObj.startDate = currentDateTime.toISOString();
    this.EmployeePlanObj.endDate = currentDateTime.toISOString();

    this.http.put<any>(`http://localhost:52830/api/EmployeeInvestments/${this.employeeInvestmentID}`,this.EmployeePlanObj).subscribe({
      next:(response)=>{
        this.toastr.warning('Plan declined');
      },
      error:(error) =>{
        this.toastr.error('Error');
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





}
