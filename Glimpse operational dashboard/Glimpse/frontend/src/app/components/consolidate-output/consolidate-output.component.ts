import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-consolidate-output',
  templateUrl: './consolidate-output.component.html',
  styleUrls: ['./consolidate-output.component.css']
})
export class ConsolidateOutputComponent {
  public startDate: string ="";
  public endDate: string ="";
  public rows: any[] = [];
  constructor(public dash:DashboardComponent){
    for (let i = 1; i <= 30; i++) {
      this.rows.push(i);
    }
  }
  datePick()
  {
    console.log(this.startDate + " " + this.endDate);
    this.dash.setStartDate(this.startDate);
    this.dash.setEndDate(this.endDate);
  }
  showFile(value:number){
    this.dash.showFile(value);
  }
}
