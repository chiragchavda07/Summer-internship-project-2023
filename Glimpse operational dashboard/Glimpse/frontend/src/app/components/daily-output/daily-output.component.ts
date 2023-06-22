import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-daily-output',
  templateUrl: './daily-output.component.html',
  styleUrls: ['./daily-output.component.css']
})
export class DailyOutputComponent {
  public total_records:number=0;
  public s:string="";
  public e:string="";
  public loading:boolean=false;
  public filename:string ="";
  constructor(public dash:DashboardComponent,public serv:RequestHandlerService){
    this.setSEdate();
    this.filename = "GlimpseData"+this.s+"-"+this.e+".csv";
  }
  setSEdate(){
    const date = new Date();
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    this.s = `${year}/${month}/${day}`;

    date.setDate(date.getDate() - 1);

     const year2 = date.getFullYear();
     const month2 = (date.getMonth() + 1).toString().padStart(2, '0');
     const day2 = date.getDate().toString().padStart(2, '0');
     this.e = `${year2}/${month2}/${day2}`;
     console.log(this.s+ " " + this.e);
  }
  // getDailyOpfile():void{
  //   this.serv.displayDop().subscribe(
  //     (response : any[])=> {
  //       this.total_records = response.length;
  //       localStorage.setItem('dailyOpfile',JSON.stringify(response));
  //       console.log("daily output file stored in localstorage");
  //     },
  //     (error:any)=>{
  //       // alert("Server connection error " );
  //     }
  //   )
  // }
  
  async downloadThisfile(){
    this.loading=true;
    try {
      const response = await this.serv.downloadCSVdm(1).toPromise();
      this.loading = false;
          if(!response){
            alert("No file to download");
            return;
          }
          console.log("file received");
          const csvData = response; // Assuming the response contains the CSV data
          const blob = new Blob([csvData], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = this.filename;
          anchor.click();
          window.URL.revokeObjectURL(url);
    } catch (error) {
      this.loading=false;
      alert("Monthly output file couldn't download ");
    }
  }
 
  showFile(value:number){
    this.dash.showFile(value);
  }
}


