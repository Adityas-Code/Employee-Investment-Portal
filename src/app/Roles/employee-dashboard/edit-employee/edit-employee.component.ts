import { Component, OnInit,ViewChild } from '@angular/core';
import { RoleServiceService } from '../../role-service.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  editingMode : boolean = false;
  showNotification: boolean = false;
  showEditSection: boolean = false;

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

  constructor(private routes:Router, private roleservice: RoleServiceService, private http: HttpClient, private observer: BreakpointObserver){}

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
    //taking employee id for investment plan
    

    this.roleservice.getEmployeeData().subscribe((result)=>{
      this.Employess = result;
      if(this.Employess != null){
        const employee = this.Employess.find(e => e.email == localStorage.getItem("email"))
        console.log("THis is my data")
        console.log(employee);
        this.EmpObj = employee;
      }
    });

    debugger
    // this.roleservice.setEmployeeID(this.EmpObj.employeeID);
    // console.log(this.EmpObj.employeeID);

  }

  updateEmployeeDetails():void{
    this.http.put<any>('http://localhost:52830/api/Employees/'+ this.EmpObj.employeeID, this.EmpObj).subscribe(
      (response) =>{
        console.log('Employee details updated successfully');
        this.editingMode = false;
      },
      (error) =>{
        console.error(error);
      }  
    );

    this.showNotification = true;
    this.editingMode = false;
    setTimeout(() =>{
      this.showNotification = false;
    }, 3000);
    
    this.showEditSection =  false;
    
  }

  editDetails():void{
    this.editingMode = true;
    console.log('Edit Details');
    this.showEditSection = true;
  }


}
