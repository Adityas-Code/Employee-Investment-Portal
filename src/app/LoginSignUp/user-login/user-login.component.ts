import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleServiceService } from 'src/app/Roles/role-service.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  
  
  ngOnInit(): void {
    debugger
    const localData = localStorage.getItem('signupUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);

    }
  }

  collection : any[] = [];
  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    password: '',
    roleID: ''
  };
  loginObj: any = {
    email: '',
    password: ''
    //roleID: 3
  };

  constructor(private routes:Router,private toastr: ToastrService, public roleservice : RoleServiceService) {}

  onSignUp() {
    debugger
    this.signupObj.roleID = 3;// hardcoding the role as employee for know
    console.log(this.signupObj);
    console.log(this.signupUsers);

    //alert("Reached");

    this.roleservice.postUser(this.signupObj).subscribe((result) =>{
      this.toastr.success("register user successfully", "please Login");
    });

    
    this.toastr.success("SignUp successfully", "Please do login ");

    this.signupUsers.push(this.signupObj);
    
    this.signupObj = {
      userName: '',
      email: '',
      password: '',
      roleID: '3'
    }
  }

  onLogin() {
    debugger
    this.roleservice.getList().subscribe((result)=>{
      //console.warn(result);
      this.collection = result

      //console.log(this.collection);

      const isUserExist = this.collection.find(u => u.email == this.loginObj.email && u.password == this.loginObj.password); //&& u.roleID == this.loginObj.roleID);

      //console.log(isUserExist);
      //hr demo credentials
      const hrEmail = 'hr@example.com';
      const hrPassword = 'hrpassword';

      //admin demo credentials
      const adminEmail = 'admin@example.com';
      const adminPassword = 'adminpassword';

      debugger
      if (isUserExist != undefined) {
        localStorage.setItem('username',isUserExist.userName)//key = username, value = isUserExist.username

        localStorage.setItem('email', isUserExist.email);//key = email, value = isUserExist.email

        this.toastr.success("Login successfully", "Login successfully good day!! ");

        // if(isUserExist.email == hrEmail && isUserExist.password == hrPassword){
        //   this.routes.navigateByUrl('HrDashboard');
        // }else if(isUserExist.email == adminEmail && isUserExist.password == adminPassword){
        //   this.routes.navigateByUrl('AdminDashboard');
        // }else{
        //   this.routes.navigateByUrl('EmployeeDashboard');
        // }

        if(isUserExist.roleID === 1){
          this.routes.navigateByUrl('AdminDashboard');
        }else if(isUserExist.roleID === 2){
          this.routes.navigateByUrl('HrDashboard');
        }else{
          this.routes.navigateByUrl('EmployeeDashboard');
        }

    } else {
        this.toastr.error("Invalid Credential", "Or Please Signup!! ");
    }
    });

  }
}



    ////////
    //trying different method
  //   this.roleservice.getList().subscribe((result) => {
  //     const isUserExist = result.find((u: { email: string, password: string }) => u.email == this.loginObj.email && u.password == this.loginObj.password);
  //     if (isUserExist) {
  //         localStorage.setItem('email', isUserExist.email);
  //         localStorage.setItem('Employee', JSON.stringify(isUserExist)); // Store the employee object
  //         this.toastr.success("Login successfully", "Login successfully good day!!");
  //         this.routes.navigateByUrl('EmployeeDashboard');
  //     } else {
  //         this.toastr.error("Invalid Credential", "Or Please Signup!!");
  //     }
  // });


    //////////
