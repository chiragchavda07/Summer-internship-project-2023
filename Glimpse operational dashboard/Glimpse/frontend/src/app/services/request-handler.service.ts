import { server_url } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {
  private serverURL = server_url;
  constructor(public http:HttpClient) { }
  getData(startDate:string,endDate:string):Observable<any>{
    // const url=`${this.serverURL}/home`;
    const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate);
    console.log("*");
    return this.http.get('http://192.168.137.193:8090/download', { params, responseType: 'blob' })
  } 
}
