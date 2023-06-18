import { number } from 'prop-types';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showfile',
  templateUrl: './showfile.component.html',
  styleUrls: ['./showfile.component.css']
})
export class ShowfileComponent {
  
  public rows: any[] = [];
  @Input()
  fileId!: number;
  constructor(public dash: DashboardComponent){
    for (let i = 1; i <= 30; i++) {
      this.rows.push(i);
    }
  }
  goBack(){
    this.dash.goBack();
  }
}
