import { Component} from '@angular/core';

@Component({
  selector: 'app-daily-client',
  templateUrl: './daily-client.component.html',
  styleUrls: ['./daily-client.component.css']
})
export class DailyClientComponent {
  public rows: any[] = [];
  constructor(){
    for (let i = 1; i <= 30; i++) {
      this.rows.push(i);
    }
  }
}
