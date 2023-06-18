import { DashboardComponent } from './../dashboard/dashboard.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-monthly-output',
  templateUrl: './monthly-output.component.html',
  styleUrls: ['./monthly-output.component.css']
})
export class MonthlyOutputComponent {
  public rows: any[] = [];
  constructor(public dash:DashboardComponent){
    for (let i = 1; i <= 30; i++) {
      this.rows.push(i);
    }
  }
  showFile(value:number){
     this.dash.showFile(value);
  }
}
