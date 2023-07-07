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
  constructor(public dash:DashboardComponent,public serv:RequestHandlerService){
  }
  datePick()
  {
    if(this.validDate()){
      console.log(this.startDate + " " + this.endDate + " range consolidate output file downloaded ");
      this.loading=true;
      const download$ = this.serv.downloadCons(this.startDate,this.endDate,this.capped);
      download$.subscribe(
        response => {
          this.loading = false;
          console.log("file received");
          const csvData = response; // Assuming the response contains the CSV data
          const s = (this.capped ? "_capped":"_uncapped");
          const filename = "consolidated_output_file_"+this.startDate+"-"+this.endDate + s + ".csv"; // Set the custom filename here
          console.log(filename);
          const blob = new Blob([csvData], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = filename;
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
  showFile(value:number){
    this.dash.showFile(value);
  }
  validDate():boolean{
    const startDattMoment = moment(this.startDate);
    const endDateMoment = moment(this.endDate);
    const today = moment()
    return startDattMoment.isBefore(endDateMoment) && (endDateMoment.isSameOrBefore(today));
  }
  toggleVariable(){
     this.capped = !this.capped;
  }
}
