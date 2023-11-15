import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//import { Employee } from '../Models/employee.model';
import { Router } from '@angular/router';
import { EmployeedataModule } from '../Models/employeedata/employeedata.module';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  constructor(private http: HttpClient, private router: Router ){ }

  readonly baseURL = "http://localhost:52830/api/Logins";

  readonly employeeURL = "http://localhost:52830/api/Employees";

  readonly employeeInvestmentURL = "http://localhost:52830/api/EmployeeInvestments";

  private employeeID: string = "";

  setEmployeeID(id: string){
    this.employeeID = id;
  }
  getEmployeeID(): string {
    return this.employeeID;
  }


  postUser(data: any):Observable<any> {
    return this.http.post(this.baseURL, data);
  }
  getList():Observable<any> {
    return this.http.get(this.baseURL);
  }


  getEmployeeData():Observable<any>{
    return this.http.get('http://localhost:52830/api/Employees');
  }
  getEmployeeDataById(employeeId:number):Observable<any>{
    return this.http.get(`http://localhost:52830/api/Employees/${employeeId}`);
  }

  getPlanNameById(planId:number):Observable<any>{
    return this.http.get(`http://localhost:52830/api/InvestmentPlans/${planId}`);
  }

  getStatusNameById(statusId:number):Observable<any>{
    return this.http.get(`http://localhost:52830/api/Status/${statusId}`);
  }

  enrollInvestment(data: any): Observable<any>{
    debugger
    console.log(data)
    return this.http.post<any>(`http://localhost:52830/api/EmployeeInvestmentsNew`,data);
  }

  getPendingApprovals():Observable<any>{
    return this.http.get(`${this.employeeInvestmentURL}/PendingApprovals`);
  }

  getEmployeeInvestementData():Observable<any>{
    return this.http.get(`http://localhost:52830/api/EmployeeInvestments`);
  }

  approveOrDecline(id: number, action: string): Observable<any> {
    return this.http.put<any>(`http://localhost:52830/api/EmployeeInvestments/PendingApprovals/${id}`, {action});
  }
  

  //deleting login details
  deleteLoginDetails(loginID: number):Observable<any>{
    return this.http.delete(`http://localhost:52830/api/Logins/${loginID}`);
  }

  getInvestmentPlans():Observable<any>{
    return this.http.get(`http://localhost:52830/api/InvestmentPlans`);
  }



  //http://localhost:52830/api/Employees

  //http://localhost:52830/api/Employees/email/rutvi%40gmail.com
  // getEmployeeDataByEmail(email: string):Observable<any>{
  //   return this.http.get('${this.employeeURL}/email/${email}');
  // }

  // getEmployeeDetails():Observable<any>{
  //   return this.http.get('http://localhost:52830/api/Employees');
  // }

  


  redirectToDashboard(roleID : string){
    switch(roleID){
      case '1'://Admin roleID
        this.router.navigate(['AdminDashboard']);
        break;
      case '2'://HR roleID
        this.router.navigate(['HrDashboard']);
        break;
      case '3'://Employee roleID
        this.router.navigate(['EmployeeDashboard']);
        break;
      default:
        break;
    }
  }

}
