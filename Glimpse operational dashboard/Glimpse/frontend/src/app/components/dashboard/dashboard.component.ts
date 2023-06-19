
import { Component,Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { Observable } from 'rxjs';
import { object } from 'prop-types';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
    public currentTime:string | undefined;
    public showF:number=0;
    public greeting:number=0;
    public msgFromServer:string="";
    public startDate: string ="";
    public endDate: string ="";
    public fID:number=-1;
    public tableArr: any[] = [];
    ngOnInit()
    {
      // this.grid = 0;
      // this.intervalId=-1;
      this.getTimeIndex();
      this.updateCurrentTime(); // Call the method to set initial current time
    setInterval(() => {
      this.updateCurrentTime(); // Update current time every second
    }, 1000);
    }
   
    constructor(private auth:AuthService,private serv:RequestHandlerService){
      // this.getData();
    }
    
    setStartDate(value:string){
      this.startDate =  value;
    }
    setEndDate(value:string){
      this.endDate =  value;
    }
    logOut(){
      this.auth.logOut();
    }
    updateCurrentTime(): void {
      const date = new Date();
      this.currentTime = date.toLocaleString(
        undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        });
       // Set the current time
    }
    getTimeIndex()
    {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        this.greeting = 0; //good morning
      } else if (currentHour < 18) {
        this.greeting = 1; //good afternon
      } else {
        this.greeting = 2; //Good evening!
      }
    }

    //api calls
    downloadOp():void{
      this.serv.downloadCSVdm(this.startDate,this.endDate).subscribe(
        response => {
          console.log("file received");
          const blob = new Blob([response], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        },
        (error:any)=>{
          this.msgFromServer = error;
          alert("message not received " + error);
        }
      )
    }
    downloadCons():void{
      this.serv.downloadCons(this.startDate,this.endDate).subscribe(
        response => {
          console.log("file received");
          const blob = new Blob([response], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        },
        (error:any)=>{
          this.msgFromServer = error;
          alert("message not received " + error);
        }
      )
    }
    displayOp():void{  //to display daily and monthly output file
       this.serv.displayDm(this.startDate, this.endDate).subscribe(
        (response : any[])=> {
          // const json = JSON.stringify(response);
          // console.log(json);
          this.tableArr = response;
          console.log("response pushed in table");
        },
        (error:any)=>{
          this.msgFromServer = error;
          alert("Internal error " + error);
        }
      )
    }
    showFile(value:number){
      this.displayOp();
      console.log("showfile function in dashboard passed");
      this.showF=1;
      this.fID = value;
    }
    goBack(){
      this.showF=0;
    }

}

