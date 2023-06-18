import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public startDate: string ="";
  public endDate: string ="";
  constructor(public dash:DashboardComponent){
  }
  datePick()
  {
    console.log(this.startDate + " " + this.endDate);
    this.dash.setStartDate(this.startDate);
    this.dash.setEndDate(this.endDate);
  }

}


