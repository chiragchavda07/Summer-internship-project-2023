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
  downloadCSVdm(id:number):Observable<any>{
    const params = new HttpParams().set('id',id);
    return this.http.get(`http://${this.server_ip}:${this.server_port}/download`, { params, responseType: 'blob' })
  } 
  downloadCons(startDate:string,endDate:string):Observable<any>{
    const params = new HttpParams()
    .set('startDate', startDate)
    .set('endDate', endDate);
    console.log("*");
    return this.http.get(`http://${this.server_ip}:${this.server_port}/downloadcons`, { params, responseType: 'blob' })
  }
  displayDop():Observable<any[]>{
    return this.http.get<any[]>(`http://${this.server_ip}:${this.server_port}/showdailyop`)
  }
  displayMop():Observable<any[]>{
    return this.http.get<any[]>(`http://${this.server_ip}:${this.server_port}/showmonthlyop`)
  } 
  dailyGrid():Observable<any[]>{
    return this.http.get<any[]>(`http://${this.server_ip}:${this.server_port}/dailyclient`)
  }
  opGrid(id:number):Observable<any>{
    const params=new HttpParams().set('id',id);
    return this.http.get<any>(`http://${this.server_ip}:${this.server_port}/dailyopstat`,{params})
  }
  // dailyOpGrid():Observable<any[]>{
  //   return this.http.get<any[]>(`http://${this.server_ip}:${this.server_port}/dailyclient`)
  // }
  // monthlyOpGrid():Observable<any[]>{
  //   console.log("*");
  //   return this.http.get<any[]>(`http://${this.server_ip}:${this.server_port}/dailyclient`)
  // }
}
