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
      console.log('Employee ID:',this.employeeID );
      console.log('Plan ID:',this.planID );
      console.log('Employee Investment ID:',this.employeeInvestmentID );
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
    let action: string = "approve";

    const newAction = {action: action};
    this.roleservice.approveOrDecline(this.employeeInvestmentID, action).subscribe({
      next: (response) => {
        this.toastr.success('Approved successfully');
      },
      error: (error) => {
        //this.toastr.error('Error');
      }
    });
  }
  declineInvestmentPlan():void{
    
  }



}
