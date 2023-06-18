import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup,FormControl,FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css']
})
export class DashHomeComponent {
  public greet:number=0;

  constructor(public dash:DashboardComponent){
   this.setGreet();
  }
  setGreet(){
    this.greet = this.dash.greeting;
  }
  
}
