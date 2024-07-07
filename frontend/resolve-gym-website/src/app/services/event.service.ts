import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl='http://localhost:3000/events'

  constructor(private _http:HttpClient) { }
  
 getAllEvents():Observable<Event[]>{
  return this._http.get<Event[]>(this.baseUrl+'/')
 }
 getEventById(id:String):Observable<Event>{
  return this._http.get<Event>(this.baseUrl+'/'+id)
 }  
 addEvent(event:Event):Observable<Event>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(event)
  return this._http.post<Event>(this.baseUrl+'/add',body,httpOptions)
 }
 deleteEvent(id:string):Observable<Event>{
  return this._http.delete<Event>(this.baseUrl+'/'+id)
 }
 updateEvent(updateEvent:Event):Observable<Event>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(updateEvent)
  return this._http.put<Event>(`${this.baseUrl}/edit/${updateEvent._id}`,body,httpOptions)

  }
}
