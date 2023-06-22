import { Component} from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-daily-client',
  templateUrl: './daily-client.component.html',
  styleUrls: ['./daily-client.component.css']
})
export class DailyClientComponent {
  constructor(public dash:DashboardComponent){
  }
  jsonify(value:string){
    return JSON.parse(value);
  }
}
