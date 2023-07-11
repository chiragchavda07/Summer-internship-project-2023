
import { Component,Injectable } from '@angular/core';
// import { AuthService } from '../../services/auth/auth.service';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';

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
    public capped:boolean=false;
    public fID:number=-1;
    public tableArr: any[] = [];
    public dailyGrid: any[] = [];
    public opGrid: any[] = [];
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
    public dailyclientAvailable:boolean=false;
    public opAvailable:boolean=false;
    public greeting:number=-1;
    public searchDate:string="";
    ngOnInit()
    {
      this.setSearchDate();
      this.displayGrids();  //I'm loading daily and monthly output file at the time of initialization of dashboard
      this.updateCurrentTime(); // Call the method to set initial current time
    setInterval(() => {
      this.getTimeIndex();
      this.updateCurrentTime(); // Update current time every second
    }, 1000);
    }
   
    constructor(private serv:RequestHandlerService){}
    
    setSearchDate(){
      this.searchDate = new Date().toISOString().slice(0, 10);
    }
    setEndDate(value:string){
      this.endDate =  value;
    }
    // logOut(){
    //   this.auth.logOut();
    // }
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
    // downloadCons():void{
    //   if(this.startDate=="" ||this.endDate=="") 
    //    {
    //     alert("Please enter the date range");
    //     return;
    //    }
    //   this.serv.downloadCons(this.startDate,this.endDate,this.capped).subscribe(
    //     response => {
    //       console.log("file received");
    //       const blob = new Blob([response], { type: 'text/csv' });
    //       const url = window.URL.createObjectURL(blob);
    //       window.open(url);
    //     },
    //     (error:any)=>{
    //       alert("Server connection error ");
    //     }
    //   )
    //   this.startDate = "";
    //   this.endDate = "";
    // }
    async displayOp():Promise<void>{  //to display daily and monthly output file
      if(this.fID==0){ //to show daily output file
        try {
          const responce = await this.serv.displayDop(this.searchDate).toPromise();
          this.tableArr = responce as any[];
          this.loading=false;
          if (this.tableArr.length) {
            console.log("daily output file can be viewed");
          } else {
            console.log("daily output file arrived, but there is no data");
            setTimeout(() => {
            alert("No data found");
            },10);
          }
        } catch (error) {
          this.loading = false;
          setTimeout(() => {
          alert("No data found");
          },10);
        }     
      }
      else if(this.fID==1){//to show monthly output file
        try {
          const responce = await this.serv.displayMop(this.searchDate).toPromise();
          this.tableArr = responce as any[];
          this.loading=false;
          if (this.tableArr.length) {
            console.log("monthly output file can be viewed")
          } else {
            console.log("monthly output file arrived but there is no data");
            setTimeout(() => {
            alert("No data found");
          },10);
          }
        } catch (error) {
          this.loading = false;
          setTimeout(() => {
          alert("No data found");
          },10);
        }
      }
    }
    displayGrids(): void {
      if(this.validateSearchDate()){
        this.loading = true;
        console.log("search date : " + this.searchDate);
        const dailyGrid$ = this.serv.dailyGrid(this.searchDate);
        console.log("daily client grid called")
        const opGrids$ = this.serv.opGrid(this.searchDate);
        console.log("dmop grid called");
      forkJoin([dailyGrid$,opGrids$]).subscribe(
        ([dailyGridResponse, opGridResponce]) => {
          if(dailyGridResponse){
            this.dailyclientAvailable = true;
            this.dailyGrid = dailyGridResponse; //assigning dailyclient file to dailygrid array
          }
          if(opGridResponce)
          {
            if(opGridResponce.length) this.opAvailable=true;
            this.opGrid= opGridResponce; //assigning op response file to opgrid array
          } 
          this.loading = false;
        },
        (error: any) => {
          // this.auth.logOut();
          this.loading = false;
          setTimeout(() => {
          alert("Server connection error");
          },10);
        }
        );
      }
      else{
        alert("Please provide current date or previous date");
      }
    }
    
    async showFile(value:number){
      // this.showF=1;
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
    validateSearchDate(){
      const sdate = moment(this.searchDate);
      const today = moment();
      return sdate.isSameOrBefore(today);
    }
  }

