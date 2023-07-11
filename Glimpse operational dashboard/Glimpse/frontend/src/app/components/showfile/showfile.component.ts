import { DashboardComponent } from './../dashboard/dashboard.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showfile',
  templateUrl: './showfile.component.html',
  styleUrls: ['./showfile.component.css']
})
export class ShowfileComponent {
  
  // public rows: any[] = [];
  public rows:number=0;
  @Input()
  fileId!: number;
  @Input() tableArray: any[] = [];

  constructor(public dash: DashboardComponent){
    // this.rows= this.tableArray.length;
    console.log("showfilecomponent initialized");
    // for (const row of this.tableArray) {
    //   for (const object of row) {
    //     // Access the properties of each object
    //     const price = object.price;
    //     // const name = object.name;
    //     // Perform further operations with the data
    //     console.log(`Price: ${price}`);
    //     console.log("#");
    //   }
    // }
  }
  goBack(){
    this.dash.goBack();
  }
}
