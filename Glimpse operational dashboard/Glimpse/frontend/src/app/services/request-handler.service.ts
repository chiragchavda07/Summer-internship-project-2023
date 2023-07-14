import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {
  // private server_ip = '10.200.45.78';
  // private server_port = '8090'; 
  private url = 'http://35.178.89.183/api'
  constructor(public http:HttpClient) { }
  downloadCSVdm(file:string,path:string):Observable<any>{
    const params = new HttpParams()
    .set('fileName',file)
    .set('filePath',path);
    return this.http.get(`${this.url}/download`, {params, responseType: 'blob' })
  } 
  downloadCons(startDate:string,endDate:string,capped:boolean):Observable<any>{
    const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate)
    .set('type',capped);
    console.log("*");
    return this.http.get(`${this.url}/downloadcons`, {params, responseType: 'blob' })
  }
  displayDop(file:string,path:string):Observable<any[]>{
    const params = new HttpParams()
    .set('fileName',file)
    .set('filePath',path);
    return this.http.get<any[]>(`${this.url}/showdailyop`,{params})
  }
  displayMop(file:string,path:string):Observable<any[]>{
    const params = new HttpParams()
    .set('fileName',file)
    .set('filePath',path);
    return this.http.get<any[]>(`${this.url}/showmonthlyop`,{params})
  } 
  dailyGrid(startDate:string,startTime:string,endDate:string,endTime:string):Observable<any[]>{
    const params = new HttpParams()
    .set('fromDate',startDate)
    .set('fromTime',startTime)
    .set('toDate',endDate)
    .set('toTime',endTime);
    return this.http.get<any[]>(`${this.url}/dailyclient`,{params})
  }
  // dailyGrid(searchDate:string):Observable<any[]>{
  //   const params = new HttpParams()
  //   .set('searchDate',searchDate)
  //   return this.http.get<any[]>(`${this.url}/dailyclient`,{params})
  // }
  downloadClientfile(updatedDate:string,clientName:string,fileName:string):Observable<any>{
    const params = new HttpParams()
    .set('updatedDate',updatedDate);
    console.log("updated date : " + updatedDate);
    return this.http.get(`${this.url}/${clientName}/${fileName}`, { params, responseType: 'blob' }) 
  }
  opGrid(startDate:string,startTime:string,endDate:string,endTime:string):Observable<any>{
    const params=new HttpParams()
    .set('fromDate',startDate)
    .set('fromTime',startTime)
    .set('toDate',endDate)
    .set('toTime',endTime);
    return this.http.get<any>(`${this.url}/opstat`,{params})
  }
  // opGrid(searchDate:string):Observable<any>{
  //   const params=new HttpParams()
  //   .set('searchDate',searchDate);
  //   return this.http.get<any>(`${this.url}/opstat`,{params})
  // }

}
