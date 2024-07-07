import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../models/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private baseUrl = 'http://localhost:3000/classes'

  constructor(private _http: HttpClient) { }
  
  getAllClasses():Observable<Class[]>{
    return this._http.get<Class[]>(this.baseUrl+'/')
  }
  getClassById(id:string):Observable<Class>{
    return this._http.get<Class>(this.baseUrl+'/'+id)
  }
  addClass(classNew:Class):Observable<Class>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(classNew)
    return this._http.post<Class>(this.baseUrl+'/add', body, httpOptions)
  }
  deleteClass(id:string):Observable<Class>{
    return this._http.delete<Class>(this.baseUrl+'/'+id)
  }
  updateClass(classUpdate: Class):Observable<Class>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(classUpdate)
    return this._http.post<Class>(`${this.baseUrl}/edit/${classUpdate._id}`,body,httpOptions)
  }
}
