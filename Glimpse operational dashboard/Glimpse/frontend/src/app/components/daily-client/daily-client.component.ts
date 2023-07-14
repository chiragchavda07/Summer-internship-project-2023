import { Component} from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RequestHandlerService } from 'src/app/services/request-handler.service';

@Component({
  selector: 'app-daily-client',
  templateUrl: './daily-client.component.html',
  styleUrls: ['./daily-client.component.css']
})
export class DailyClientComponent {
  public errorToshow:any[]=[];
  public errorFile:string="Errorfile";
  public username:string="Username";
  public rw:any[]=[];
  public expand:boolean=false;
  constructor(public dash:DashboardComponent,public serve:RequestHandlerService){
  //  for(var i=0;i<50;i++){
  //   this.rw[i] = i+1; 
  //  }
  }
  jsonify(value:string){
    if(!value) return 
    return JSON.parse(value);
  }
  passIndex(value:number,arr:any){
    if(!arr) return;
    this.username = arr.user_name;
    this.errorFile = arr.filename;
    console.log(this.username + " * " + this.errorFile);
    console.log(this.errorFile);
    this.errorToshow = this.jsonify(arr.status_details).error;
  }
  downloadFile(date:string,client:string,file:string){
    console.log("daily client file download");
    this.dash.loading=true;
    const download$ = this.serve.downloadClientfile(date,client,file);
    download$.subscribe(
      response => {
        this.dash.loading = false;
        console.log("file received");
        const csvData = response; // Assuming the response contains the CSV data
        console.log(file);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = file;
        anchor.click();
        window.URL.revokeObjectURL(url);
        this.dash.showAlert();
      },
      (error:any)=>{
        this.dash.loading = false;
        setTimeout(() => {
          alert("Daily client file couldn't downloaded ");
          },10);
      }
    )
  }
 changeExpand(){
  this.expand = !this.expand;
 }
}
