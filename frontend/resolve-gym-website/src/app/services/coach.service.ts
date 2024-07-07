import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  private baseUrl= 'http://localhost:3000/coaches'

  constructor(private _http: HttpClient) { }

 getAllCoaches():Observable<Coach[]>{
  return this._http.get<Coach[]>(this.baseUrl+'/')
 }
 getCoachById(id: string):Observable<Coach>{
  return this._http.get<Coach>(this.baseUrl+'/'+id)
 }
 addCoach(coach: Coach):Observable<Coach>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(coach)
  return this._http.post<Coach>(this.baseUrl+'/add', coach)
 }
 deleteCoach(id:string):Observable<Coach>{
  return this._http.delete<Coach>(this.baseUrl+'/'+id)
 }
 updateCoach(coach: Coach):Observable<Coach>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(coach)
  return this._http.put<Coach>(`${this.baseUrl}/edit/${coach._id}`, coach, httpOptions)
 }

}
