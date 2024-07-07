import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutineRequest, RoutineResponse } from '../models/routine';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private baseUrl='http://localhost:3000/routines'

  constructor(private _http: HttpClient) { }

  getRoutines():Observable<RoutineResponse[]> {
    return this._http.get<RoutineResponse[]>(this.baseUrl+'/');
  }
  getRoutine(id: String): Observable<RoutineResponse> {
    return this._http.get<RoutineResponse>(this.baseUrl+'/'+id);
  }
  addRoutine(routine: RoutineRequest): Observable<RoutineRequest> {
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(routine)
    
    return this._http.post<RoutineRequest>(this.baseUrl+'/add', body,httpOptions);
  }
  deleteRoutine(id:string):Observable<any>{
    return this._http.delete<any>(this.baseUrl+'/'+id);
  }
  updateRoutine(routine: RoutineResponse): Observable<RoutineResponse> {
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(routine)
    
    return this._http.put<RoutineResponse>(this.baseUrl+'/add', body,httpOptions);
  }
}
