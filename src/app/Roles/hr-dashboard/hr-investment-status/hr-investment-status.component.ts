import { Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { Router } from '@angular/router';
import { RoleServiceService } from '../../role-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hr-investment-status',
  templateUrl: './hr-investment-status.component.html',
  styleUrls: ['./hr-investment-status.component.css']
})
export class HrInvestmentStatusComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  pendingRequest:any[]= [];

  pendingRequestObj = {
    employeeID: '',
    planID : 0,
    statusID: 0,
    startDate:null,
    endDate:null,
    duration: '',
  }

    // "employeeID": 0,
    // "name": "string",
    // "email": "string",
    // "age": 0,
    // "gender": "string",
    // "department": "string",
    // "contactDetails": "string",
    // "grade": "string",
    // "salary": 0 
  

  constructor(private routes:Router, private roleservice: RoleServiceService,  private toastr: ToastrService, private observer: BreakpointObserver){}

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
    this.roleservice.getEmployeeInvestementData().subscribe((result)=>{
      
      const requestWithDetails = result.map(async (request: any)=>{
        
        const employeeDetails = await this.roleservice.getEmployeeDataById(request.employeeID).toPromise();

        const planDetails = await this.roleservice.getPlanNameById(request.planID).toPromise();

        const statusDetails = await this.roleservice.getStatusNameById(request.statusID).toPromise();

        return {...request, 
          name: employeeDetails.name, /* Add other fields as needed */
          planName: planDetails.planName,
          statusName: statusDetails.statusName,
        };
      });

      Promise.all(requestWithDetails).then((finalRequest)=>{
        this.pendingRequest = finalRequest;
      });
    });



  }


  takeAction(employeeID:number, planID:number, employeeInvestmentID:number):void{
    console.log('Navigating to EditEmployeePlan with:', employeeID, planID, employeeInvestmentID);
    const url = `/EditEmployeePlan/${employeeID}/${planID}/${employeeInvestmentID}`;
    this.routes.navigateByUrl(url);
  }
 
}
