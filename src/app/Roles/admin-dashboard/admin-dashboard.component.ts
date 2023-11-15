import { Component , OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  investmentPlans: any[] = [];

  constructor(private http: HttpClient, private observer: BreakpointObserver) {}
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
    this.http.get<any[]>('http://localhost:52830/api/InvestmentPlans').subscribe(
      (plans) => {
        this.investmentPlans = plans;
      },
      (error) => {
        console.error('Error fetching investment plans:', error);
      }
    );
  }

  updateSelectedPlans(): void {
    const selectedPlans = this.investmentPlans.filter(plan => plan.selected);
    this.http.post('http://localhost:52830/api/InvestmentPlans', selectedPlans).subscribe(
      () => {
        console.log('Selected plans updated successfully');
      },
      (error) => {
        console.error('Error updating selected plans:', error);
      }
    );
  }

  isRetirementPlan(plan: any): boolean {
    return plan.name === 'Retirement Plan' && plan.age === 60;
  }
}
