import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-monthly-output',
  templateUrl: './monthly-output.component.html',
  styleUrls: ['./monthly-output.component.css']
})
export class MonthlyOutputComponent {
  public total_records:number=0;
  public s:string="";
  public e:string="";
  public loading: boolean=false;
  constructor(public dash:DashboardComponent,public serv:RequestHandlerService){
    this.setSEdate();
    // this.filename = "GlimpseData"+this.s+"-"+this.e+".csv";
    // this.getMonthlyOpfile();
    // for (let i = 1; i <= 30; i++) {
    //   this.rows.push(i);
    // }
  }
  setSEdate(){
    const date = new Date();
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    this.s = `${year}/${month}/${day}`;

    date.setMonth(date.getMonth() - 1);
     const year2 = date.getFullYear();
     const month2 = (date.getMonth() + 1).toString().padStart(2, '0');
     const day2 = date.getDate().toString().padStart(2, '0');
     this.e = `${year2}/${month2}/${day2}`;
     console.log(this.s+ " " + this.e + " dates are set");
  }
  // getMonthlyOpfile(){
  //   this.serv.displayMop().subscribe(
  //     (response : any[])=> {
  //       this.total_records = response.length;
  //       localStorage.setItem('montlyOpfile',JSON.stringify(response));
  //       console.log("monthly output file stored in localstorage");
  //     },
  //     (error:any)=>{
  //       // alert("Server connection error " );
  //     }
  //   )
  // }

  async downloadThisfile(){
    this.loading=true;
    try {
      const response = await this.serv.downloadCSVdm(2).toPromise();
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
          anchor.download = this.dash.mopFilename;
          anchor.click();
          window.URL.revokeObjectURL(url);
          this.dash.showAlert();
    } catch (error) {
      this.loading=false;
      alert("Daily output file couldn't download ");
    }
}
  // viewThisfile():void{
  //   //get file from localstorage and show it
  //   const storedDataString = localStorage.getItem('monthlyOpfile');
  //   if (storedDataString !== null) {
  //     // Parse the string back into an array
  //     const storedData: any[] = JSON.parse(storedDataString);
    
  //     // Assign the data to your tablearr variable
  //     this.dash.tableArr = storedData;
  //     console.log("monthly output file is stored in tableArr");
  //   } else {
  //     // Handle the case when the data is null
  //     // For example, assign an empty array to tablearr
  //     alert("Daily output file was not fetched");
  //   }
  // }
  showFile(value:number){
     this.dash.showFile(value);
  }
}
