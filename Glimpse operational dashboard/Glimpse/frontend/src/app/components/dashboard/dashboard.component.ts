
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
    public startTime:string="";
    public endDate: string ="";
    public endTime:string="";
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
    public expand:boolean=false;
    ngOnInit()
    {
      this.setseDate();
      // this.displayGrids();  //I'm loading daily and monthly output file at the time of initialization of dashboard
      this.updateCurrentTime(); // Call the method to set initial current time
    setInterval(() => {
      this.getTimeIndex();
      this.updateCurrentTime(); // Update current time every second
    }, 1000);
    }
   
    constructor(private serv:RequestHandlerService){}
    
    public tableStyle: any = {
      'height': 'calc(50vh - 50px)'
    };
    changeStyle(){
      this.expand = !this.expand;
      if(this.expand){
        this.tableStyle = {
         'height': 'calc(50vh)'
        }
      }
      else{
        this.tableStyle = {
          'height': 'calc(50vh - 50px)'
         }
      }
    }


    setseDate(){
      this.startDate = new Date().toISOString().slice(0, 10);
      this.endDate = new Date().toISOString().slice(0, 10);
      const currentTime = new Date();
      this.startTime= currentTime.getHours() + ":" + currentTime.getMinutes();
      this.endTime= currentTime.getHours() + ":" + currentTime.getMinutes();
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
 
    async displayOp(filename:string,path:string):Promise<void>{  //to display daily and monthly output file
      if(this.fID==0){ //to show daily output file
        try {
          const responce = await this.serv.displayDop(filename,path).toPromise();
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
          const responce = await this.serv.displayMop(filename,path).toPromise();
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
        console.log("start date : " + this.startDate);
        console.log("end date : " + this.endDate);
        // const dailyGrid$ = this.serv.dailyGrid(this.startDate,this.startTime,this.endDate,this.endTime);
        const dailyGrid$ = this.serv.dailyGrid(this.startDate,this.startTime,this.endDate,this.endTime);
        console.log("daily client grid called")
        // const opGrids$ = this.serv.opGrid(this.startDate,this.endDate);
        const opGrids$ = this.serv.opGrid(this.startDate,this.startTime,this.endDate,this.endTime);
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
    
    async showFile(value:number,filename:string,path:string){
      // this.showF=1;
      this.fID = value;
      console.log("table array length before api call : " + this.tableArr.length);
      this.loading=true;
      await this.displayOp(filename,path);
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
      console.log(this.startTime + " " +  this.endTime);
      const sdate = moment(this.startDate);
      const edate = moment(this.endDate);
      const today = moment();
      return sdate.isSameOrBefore(edate) && edate.isSameOrBefore(today);
    }
  }

