import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StepDetailsService {

  private baseUrl: String = 'http://localhost:5000';

  constructor(public http: Http) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl+'/stepDetail/getAll').map((res) => res.json());
  }

  getStepDetail(id: number){
    return this.http.get(this.baseUrl+'/stepDetail/show/'+id).map((res) => res.json());
  }

  order(data): Observable<any> {
    return this.http.post(this.baseUrl+'/stepDetail/order', data).map((res) => res.json());
  }

  createStepDetail(data): Observable<any>{
    console.log(data)
    return this.http.post(this.baseUrl+'/stepDetail/create', data).map((res) => res.json());
  }

  updateStepDetail(data): Observable<any>{
    console.log(data)
    return this.http.put(this.baseUrl+'/stepDetail/edit/'+data.id, data).map((res) => res.json());
  }

  deleteStepDetail(data): Observable<any>{
    return this.http.delete(this.baseUrl+'/stepDetail/delete/'+data).map((res) => res.json());
  }

}
