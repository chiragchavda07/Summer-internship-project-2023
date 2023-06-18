import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-daily-output',
  templateUrl: './daily-output.component.html',
  styleUrls: ['./daily-output.component.css']
})
export class DailyOutputComponent {
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
