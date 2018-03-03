import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LevelsService {

  private baseUrl: String = 'http://localhost:5000';
  level: any;
  levels:any;

  constructor(public http: Http) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl+'/levels/getAll').map((res) => this.levels = res.json());
  }

  getLevel(id: number){
    return this.http.get(this.baseUrl+'/levels/show/'+id).map((res) => res.json());
  }

  order(data): Observable<any> {
    return this.http.post(this.baseUrl+'/levels/order', data).map((res) => res.json());
  }

  createLevel(data): Observable<any>{
    console.log(data)
    return this.http.post(this.baseUrl+'/levels/create', data).map((res) => res.json());
  }
  
  updateLevel(data): Observable<any>{
    console.log(data)
    return this.http.put(this.baseUrl+'/levels/edit/'+data.id, data).map((res) => res.json());
  }

  deleteLevel(data): Observable<any>{
    return this.http.delete(this.baseUrl+'/levels/delete/'+data).map((res) => res.json());
  }

}
