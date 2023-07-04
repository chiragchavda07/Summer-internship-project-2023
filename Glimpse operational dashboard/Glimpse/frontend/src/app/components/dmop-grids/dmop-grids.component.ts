import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RequestHandlerService } from 'src/app/services/request-handler.service';

@Component({
  selector: 'app-dmop-grids',
  templateUrl: './dmop-grids.component.html',
  styleUrls: ['./dmop-grids.component.css']
})
export class DmopGridsComponent {
  public total_records:number=0;
  public date:string="";
  public loading:boolean=false;
  public rw:any[] = [];
  constructor(public dash:DashboardComponent,public serv:RequestHandlerService){
    for(var i=0;i<50;i++){
      this.rw[i] = i+1; 
     }
  }
  async downloadThisfile(type:number,filename:string){
    this.dash.loading=true;
    console.log("***enter to dowm")
    try {
      const response = await this.serv.downloadCSVdm(type,this.dash.searchDate).toPromise();
      this.dash.loading = false;
          if(!response){
            setTimeout(() => {
              alert("No file to download");
            },10);
            return;
          }
          console.log("file received");
          const csvData = response; // Assuming the response contains the CSV data
          const blob = new Blob([csvData], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = filename;
          anchor.click();
          window.URL.revokeObjectURL(url);
          this.dash.showAlert();
    } catch (error) {
      this.dash.loading=false;
      setTimeout(() => {
        alert("Monthly output file couldn't download ");
      },10);
    }
  }
 
  showFile(value:number){
    this.dash.showFile(value);
  }
  jsonify(value:string){
    return JSON.parse(value);
  }
  // jsonify(tmp:any):any {
  //   return JSON.parse(tmp.status_details).pushStatus.fileType;
  // }

}
