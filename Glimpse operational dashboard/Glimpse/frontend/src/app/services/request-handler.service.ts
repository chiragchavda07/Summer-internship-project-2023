import { server_url } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {
  private server_ip = '192.168.0.161';
  private server_port = '8090'; 
  constructor(public http:HttpClient) { }
  downloadCSVdm(startDate:string,endDate:string):Observable<any>{
    // const url=`${this.serverURL}/home`;
    const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate);
    console.log("*");
    return this.http.get(`http://${this.server_ip}:${this.server_port}/download`, { params, responseType: 'blob' })
  } 
  downloadCons(startDate:string,endDate:string):Observable<any>{
    const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate);
    console.log("*");
    return this.http.get(`http://${this.server_ip}:${this.server_port}/downloadcons`, { params, responseType: 'blob' })
  }
  displayDm(startDate:string,endDate:string):Observable<any[]>{
    // const url=`${this.serverURL}/home`;
    const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate);
    console.log("*");
    return this.http.get<any[]>(`http://${this.server_ip}:${this.server_port}/showop`)
  } 
  
}
