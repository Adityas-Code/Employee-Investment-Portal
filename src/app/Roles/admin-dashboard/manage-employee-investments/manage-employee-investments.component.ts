import { Component,ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { RoleServiceService } from '../../role-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-employee-investments',
  templateUrl: './manage-employee-investments.component.html',
  styleUrls: ['./manage-employee-investments.component.css']
})
export class ManageEmployeeInvestmentsComponent implements OnInit{

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  investmentPlans: any[] = [];
  isFormVisible: boolean = false;
  newPlanName: string = '';
  newPlanDetail: string = '';

  constructor(private http: HttpClient, private observer: BreakpointObserver, private toastr: ToastrService, private roleservice: RoleServiceService){}

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
  }

  fetchInvestmentPlans(): void {
    this.roleservice.getInvestmentPlans().subscribe((plan)=>{
      this.investmentPlans = plan;
    },
    (error) => {
      console.error('Error fetching investment plans:', error);
    }
    );
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  handlePlanSubmitted(): void {
    debugger
    // Here you can send the new plan name to your backend or perform other actions
    console.log('New Plan Name:', this.newPlanName);
    const newPlan = { planName: this.newPlanName, planDetail: this.newPlanDetail };
    this.http.post(`http://localhost:52830/api/InvestmentPlans`, newPlan).subscribe(
      ()=>{
        this.toastr.success("Plan Added Successfully");

        this.fetchInvestmentPlans();

    },
    (error)=>{
      this.toastr.error("Error");
    }
    );

    this.isFormVisible = false;
  }


}
