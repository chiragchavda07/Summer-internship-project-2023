import { DashboardComponent } from './../dashboard/dashboard.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-monthly-output',
  templateUrl: './monthly-output.component.html',
  styleUrls: ['./monthly-output.component.css']
})
export class MonthlyOutputComponent {
  public rows: any[] = [];
  public s:string="";
  public e:string="";
  constructor(public dash:DashboardComponent){
    this.setSEdate();
    this.dash.setStartDate(this.s);
    this.dash.setEndDate(this.e);
    for (let i = 1; i <= 30; i++) {
      this.rows.push(i);
    }
  }
  setSEdate(){
    const date = new Date();
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    this.s = `${year}/${month}/${day}`;

    date.setMonth(date.getMonth() - 1);
     const year2 = date.getFullYear();
     const month2 = (date.getMonth() + 1).toString().padStart(2, '0');
     const day2 = date.getDate().toString().padStart(2, '0');
     this.e = `${year2}/${month2}/${day2}`;
     console.log(this.s+ " " + this.e);
  }
  downloadThisfile():void{
    this.dash.downloadOp();
  }
  viewThisfile():void{
    this.dash.displayOp();
  }
  showFile(value:number){
     this.dash.showFile(value);
  }
}
