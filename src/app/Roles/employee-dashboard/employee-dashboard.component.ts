import { Component, ViewChild , OnInit} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';


import { RoleServiceService } from '../role-service.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  EmpObj: any = {
    employeeID: "",
    name:"",
    email:"",
    age:"", 
    gender:"", 
    department:"",
    contactDetails:"",
    salary:""
  }

  Employess: any[] = [];

  constructor(private routes: Router,private roleservice: RoleServiceService, private observer: BreakpointObserver) {}

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
    this.roleservice.getEmployeeData().subscribe((result)=>{
      this.Employess = result;
      if(this.Employess != null){
        const employee = this.Employess.find(e => e.email == localStorage.getItem("email"))
        console.log("THis is my data")
        console.log(employee);
        this.EmpObj = employee;
      }
    });
  }
}
