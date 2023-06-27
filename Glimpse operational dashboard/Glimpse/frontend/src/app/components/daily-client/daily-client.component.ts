import { Component} from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-daily-client',
  templateUrl: './daily-client.component.html',
  styleUrls: ['./daily-client.component.css']
})
export class DailyClientComponent {
  public errorToshow:any[]=[];
  public errorFile:string="Errorfile";
  public username:string="Username";
  constructor(public dash:DashboardComponent){

  }
  jsonify(value:string){
    return JSON.parse(value);
  }
  passIndex(value:number,arr:any){
    this.username = arr.user_name;
    this.errorFile = arr.filename;
    console.log(this.username + " * " + this.errorFile);
    console.log(this.errorFile);
    this.errorToshow = this.jsonify(arr.status_details).error;
  }
}
