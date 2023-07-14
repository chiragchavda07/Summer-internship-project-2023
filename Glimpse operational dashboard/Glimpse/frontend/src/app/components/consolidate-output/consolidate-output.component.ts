import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import * as moment from 'moment'
import { RequestHandlerService } from 'src/app/services/request-handler.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-consolidate-output',
  templateUrl: './consolidate-output.component.html',
  styleUrls: ['./consolidate-output.component.css']
})
export class ConsolidateOutputComponent {
  public startDate: string ="";
  public endDate: string ="";
  public loading:boolean=false;
  public capped:boolean=false;
  public universe:boolean=false;
  public filename:string='';
  constructor(public dash:DashboardComponent,public serv:RequestHandlerService){
  }
  datePick()
  {
    console.log(this.startDate + " " + this.endDate + " range consolidate output file downloaded ");
    if(this.validDate()){
      console.log(this.startDate + " " + this.endDate + " range consolidate output file downloaded ");
      this.loading=true;
      const download$ = this.serv.downloadCons(this.startDate,this.endDate,this.capped);
      download$.subscribe(
        response => {
          this.loading = false;
          console.log("file received");
          const csvData = response; // Assuming the response contains the CSV data
          if(this.startDate=="*")
          {
            const today = new Date().toISOString().slice(0, 10);
            this.filename = "consolidated_output_file_"+ today+".csv"; //if download file is having all output data till today
          }
          else{
            const s = (this.capped ? "_capped":"_uncapped");
            this.filename = "consolidated_output_file_"+this.startDate+"-"+this.endDate + s + ".csv"; // Set the custom filename here
          }
          console.log(this.filename);
          const blob = new Blob([csvData], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = this.filename;
          anchor.click();
          window.URL.revokeObjectURL(url);
          this.dash.showAlert();
        },
        (error:any)=>{
          this.loading = false;
          setTimeout(() => {
            alert("Consolidate output file couldn't downloaded ");
          },10);
        }
      )

      // forkJoin(download$).subscribe(
      //   (downloadResponse) => {
      //     this.loading = false;
      //     // Unsubscribe from the subscriptions
      //     downloadSubscription.unsubscribe();
      //   },
      //   (error: any) => {
      //     // this.msgFromServer = error;
      //     this.loading = false;
      //     alert("Server connection error");
      //     downloadSubscription.unsubscribe();
      //   })
    }
    else{
      alert("Please enter valid range of date");
    }

  }
  // showFile(value:number){
  //   this.dash.showFile(value);
  // }
  validDate():boolean{
    if(this.startDate=="*") return true;
    const startDattMoment = moment(this.startDate);
    const endDateMoment = moment(this.endDate);
    const today = moment();
    return startDattMoment.isBefore(endDateMoment) && (endDateMoment.isSameOrBefore(today));
  }
  toggleVariable(){
     this.capped = !this.capped;
  }
  updateUniverse(value: boolean) {
    if(value){
      this.startDate = "*";
      this.endDate = "*";
      console.log(this.startDate);
      console.log(this.endDate);
    }
    this.universe=value;
  }
}
