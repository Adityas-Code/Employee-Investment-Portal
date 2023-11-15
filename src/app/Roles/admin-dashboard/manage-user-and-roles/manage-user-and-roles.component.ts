import { Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { ToastrService } from 'ngx-toastr';
import { RoleServiceService } from '../../role-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-user-and-roles',
  templateUrl: './manage-user-and-roles.component.html',
  styleUrls: ['./manage-user-and-roles.component.css'],
})
export class ManageUserAndRolesComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  logins: any[] = [];
  selectedLogin:any;
  selectedEmployee:any;

  allowedRoles:{id:number,name:string}[]=[
    {id:1, name:'ADMIN'},
    {id:2, name:'HR'},
    {id:3, name:'EMPLOYEE'}
  ];

  constructor(private toastr: ToastrService,private roleservice: RoleServiceService, private http: HttpClient, private observer: BreakpointObserver) {}

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
    this.fetchLogins();
  }

  fetchLogins():void{
    this.roleservice.getList().subscribe((result) => {
      this.logins = result;
    },
    (error)=>{
      console.log(error);
    }
    );
  }

  editLogin(login: any): void {
    console.log('Edit login:', login);
    this.selectedLogin = { ...login };
    const selectedRole = this.allowedRoles.find((role) => role.id === login.roleID);
    if (selectedRole) {
      this.selectedLogin.roleID = selectedRole.id;
      this.selectedLogin.roleName = selectedRole.name;
    }

    this.fetchEmployeeDetails();
    
  }

  // fetchEmployee():void{
  //   const email = this.selectedLogin.email;
  //   this.http.get<any[]>(`http://localhost:52830/api/Employees/email/${email}`).subscribe(
  //     (data) => {
  //       if (data.length > 0) {
  //         this.selectedEmployee = { ...data[0] };
  //       } else {
  //         this.selectedEmployee = null;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  fetchEmployeeDetails():void{
    this.http.get<any[]>('http://localhost:52830/api/Logins').subscribe(
      (loginsData) => {
        this.logins = loginsData;
        this.http.get<any[]>('http://localhost:52830/api/Employees').subscribe(
          (employeesData) => {
            this.combineData(employeesData, loginsData);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.logins);
  }

  combineData(employeesData: any[], loginsData: any[]) {
    
    this.logins = loginsData.map((login) => {
      const employee = employeesData.find((employee) => employee.email === login.email);
      if (employee) {
        login.department = employee.department;
      }
      return login;
    });
    
  }

  deleteLogin(loginID: number): void {
    
    console.log('Delete login with ID:', loginID);
    // You can send a delete request to the backend API to delete the login record
    this.http.delete(`http://localhost:52830/api/Logins/${loginID}`).subscribe(
      () => {
        // Remove the deleted login from the logins array
        this.logins = this.logins.filter((login) => login.loginID !== loginID);
        this.toastr.success('Login deleted successfully', 'Notification');
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error');
      }
    );
  }


  updateLogin():void{
    debugger
    this.http.put(`http://localhost:52830/api/Logins/${this.selectedLogin.loginID}`, this.selectedLogin).subscribe(
    () => {
      const index = this.logins.findIndex((login) => login.loginID === this.selectedLogin.loginID);
      if (index !== -1) {
        this.logins[index] = { ...this.selectedLogin };
      }
      // Update the employee details separately
      this.http.put(`http://localhost:52830/api/Employees/${this.selectedEmployee.employeeID}`, this.selectedEmployee).subscribe(
        () => {
          debugger
          // Employee details updated successfully
          this.selectedLogin = null;
          this.selectedEmployee = null;
          this.toastr.success('Edit successful', 'Notification');
          console.log("Role changed successfully");
        },
        (error) => {
          console.log(error);
          this.toastr.error("Error");
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
  }

  showNotification():void{
    this.toastr.success('Edit successful', 'Notification');
  }
}
