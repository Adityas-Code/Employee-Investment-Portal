import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//angular material module for side nav
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
//


import { UserLoginComponent } from './LoginSignUp/user-login/user-login.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './Roles/admin-dashboard/admin-dashboard.component';
import { HrDashboardComponent } from './Roles/hr-dashboard/hr-dashboard.component';
import { EmployeeDashboardComponent } from './Roles/employee-dashboard/employee-dashboard.component';
import { InvestmentPlanComponent } from './Roles/employee-dashboard/investment-plan/investment-plan.component';
import { BulkUploadComponent } from './Roles/hr-dashboard/bulk-upload/bulk-upload.component';
import { HrInvestmentStatusComponent } from './Roles/hr-dashboard/hr-investment-status/hr-investment-status.component';
import { EditEmployeePlanComponent } from './Roles/hr-dashboard/edit-employee-plan/edit-employee-plan.component';
import { EditEmployeeComponent } from './Roles/employee-dashboard/edit-employee/edit-employee.component';
import { ManageUserAndRolesComponent } from './Roles/admin-dashboard/manage-user-and-roles/manage-user-and-roles.component';
import { ManageEmployeeInvestmentsComponent } from './Roles/admin-dashboard/manage-employee-investments/manage-employee-investments.component';
import { authGuardGuard } from './LoginSignUp/auth-guard.guard';

const routes :Routes = [
  {path:'UserLogin', component:UserLoginComponent},
  {path:'EmployeeDashboard', component:EmployeeDashboardComponent, canActivate:[authGuardGuard]},
  {path:'AdminDashboard', component:AdminDashboardComponent, canActivate:[authGuardGuard]},
  {path:'HrDashboard', component:HrDashboardComponent, canActivate:[authGuardGuard]},
  {path:'InvestmentPlan', component:InvestmentPlanComponent},
  {path:'BulkUpload', component:BulkUploadComponent},
  {path:'HrInvestmentStatus', component:HrInvestmentStatusComponent},
  {path:'EditEmployeePlan/:employeeID/:planID/:employeeInvestmentID', component:EditEmployeePlanComponent},
  {path:'EditEmployee', component:EditEmployeeComponent},
  {path:'ManageUserAndRoles', component:ManageUserAndRolesComponent},
  {path:'ManageEmployeeInvestments', component:ManageEmployeeInvestmentsComponent},

  {path:'',redirectTo:'UserLogin',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    AdminDashboardComponent,
    HrDashboardComponent,
    EmployeeDashboardComponent,
    InvestmentPlanComponent,
    BulkUploadComponent,
    HrInvestmentStatusComponent,
    EditEmployeePlanComponent,
    EditEmployeeComponent,
    ManageUserAndRolesComponent,
    ManageEmployeeInvestmentsComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot({ timeOut: 2000 ,enableHtml: true }),
    HttpClientModule,
    BrowserAnimationsModule,

    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
