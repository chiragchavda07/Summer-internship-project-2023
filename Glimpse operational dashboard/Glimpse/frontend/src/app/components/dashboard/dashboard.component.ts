
import { Component,Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { Observable, forkJoin } from 'rxjs';
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
    public startDate: string ="";
    public endDate: string ="";
    public fID:number=-1;
    public tableArr: any[] = [];
    public dailyGrid: any[] = [];
    public dailyOpGrid: any[] = [];
    public monthlyOpGrid: any[] = [];
    public dailyOpfile:any[]=[];
    public monthlyOpfile:any[]=[];
    public loading:boolean=false;
    public dopFilename:string="";
    public doprecords:number=0;
    public dopProcessTime:string="";
    public mopFilename:string="";
    public moprecords:number=0;
    public mopProcessTime:string="";
    public showalert:boolean=false;
    public consGrid:boolean=false;
    ngOnInit()
    {
      this.displayGrids();  //I'm loading daily and monthly output file at the time of initialization of dashboard
      // this.getTimeIndex();
      this.updateCurrentTime(); // Call the method to set initial current time
    setInterval(() => {
      this.updateCurrentTime(); // Update current time every second
    }, 1000);
    }
   
    constructor(private auth:AuthService,private serv:RequestHandlerService){}
    
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
    downloadCons():void{
      if(this.startDate=="" ||this.endDate=="") 
       {
        alert("Please enter the date range");
        return;
       }
      this.serv.downloadCons(this.startDate,this.endDate).subscribe(
        response => {
          console.log("file received");
          const blob = new Blob([response], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        },
        (error:any)=>{
          alert("Server connection error ");
        }
      )
      this.startDate = "";
      this.endDate = "";
    }
    async displayOp():Promise<void>{  //to display daily and monthly output file
      if(this.fID==1){ //to show daily output file
        try {
          const responce = await this.serv.displayDop().toPromise();
          this.tableArr = responce as any[];
          this.loading=false;
          if (this.tableArr.length) {
            console.log("daily output file can be viewed");
          } else {
            console.log("daily output file arrived, but there is no data");
            alert("No data found");
          }
        } catch (error) {
          this.loading=false;
          alert("No data found");
        }     
      }
      else if(this.fID==2){//to show monthly output file
        try {
          const responce = await this.serv.displayMop().toPromise();
          this.tableArr = responce as any[];
          this.loading=false;
          if (this.tableArr.length) {
            console.log("monthly output file can be viewed")
          } else {
            console.log("monthly output file arrived but there is no data");
            alert("No data found");
          }
        } catch (error) {
          this.loading=false;
          alert("No data found");
        }
      }
    }
    displayGrids(): void {
      this.loading = true;
      const dailyGrid$ = this.serv.dailyGrid();
      console.log("daily client grid called")
      const DoPGrid$ = this.serv.opGrid(1);
      console.log("daily output grid called")
      const MoPGrid$ = this.serv.opGrid(2);
      console.log("daily output grid called")
      forkJoin([dailyGrid$, DoPGrid$,MoPGrid$]).subscribe(
        ([dailyGridResponse, dopGridResponce,mopGridResponce]) => {
          this.dailyGrid = dailyGridResponse; //assigning dailyclient file to dailygrid array
          if(dopGridResponce)
          {
            this.dopFilename = dopGridResponce.filename;
    
            // this.doprecords = this.jsonify(dopGridResponce.status_details).totalRowsSaved;
            this.doprecords = JSON.parse(dopGridResponce.status_details).pushStatus.totalRowsSaved;
            console.log(this.doprecords);
            this.dopProcessTime = JSON.parse(dopGridResponce.status_details).pushStatus.startTimeStamp;     
          } 
          if(mopGridResponce)
          {
            this.mopFilename = mopGridResponce.filename;
            // this.moprecords = this.jsonify(dopGridResponce.status_details).totalRowsSaved;
            this.moprecords = JSON.parse(mopGridResponce.status_details).pushStatus.totalRowsSaved;
            console.log(this.moprecords);
            this.mopProcessTime = JSON.parse(mopGridResponce.status_details).pushStatus.startTimeStamp;     
          } 
          this.loading = false;
          this.consGrid=true;
        },
        (error: any) => {
          // this.auth.logOut();
          alert("Server connection error");
          this.loading = false;
        }
      );
    }
    
    async showFile(value:number){
      this.fID = value;
      console.log("table array length before api call : " + this.tableArr.length);
      this.loading=true;
      await this.displayOp();
      console.log("table array length after api call : " + this.tableArr.length);
      if(this.tableArr.length) 
      {
        console.log("file stored in tableArr");
        this.showF=1;
      }
    }
    goBack(){
      this.tableArr=[];
      this.showF=0;
    }
    showAlert(){
      this.showalert=true;
      setTimeout(()=>{
        this.showalert=false;
      },3000);
    }
  }

