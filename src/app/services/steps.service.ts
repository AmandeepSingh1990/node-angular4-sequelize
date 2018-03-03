import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StepsService {

  private baseUrl: String = 'http://localhost:5000';

  constructor(public http: Http) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl+'/steps/getAll').map((res) => res.json());
  }

  getStep(id: number){
    return this.http.get(this.baseUrl+'/steps/show/'+id).map((res) => res.json());
  }

  order(data): Observable<any> {
    return this.http.post(this.baseUrl+'/steps/order', data).map((res) => res.json());
  }

  createStep(data): Observable<any>{
    console.log(data)
    return this.http.post(this.baseUrl+'/steps/create', data).map((res) => res.json());
  }

  updateStep(data): Observable<any>{
    console.log(data)
    return this.http.put(this.baseUrl+'/steps/edit/'+data.id, data).map((res) => res.json());
  }

  deleteStep(data): Observable<any>{
    return this.http.delete(this.baseUrl+'/steps/delete/'+data).map((res) => res.json());
  }

}
