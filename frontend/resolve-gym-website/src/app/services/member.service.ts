import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberRequest, MemberResponse } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl='http://localhost:3000/members'

  constructor(private _http:HttpClient) { }


 getMembers():Observable<any> {
    return this._http.get(this.baseUrl+'/');
  }
 getMemberById(id:string):Observable<MemberResponse>{
   return this._http.get<MemberResponse>(`${this.baseUrl}/${id}`);
 }
 addMemeber(mem:MemberRequest):Observable<MemberRequest>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(mem)
  return this._http.post<MemberRequest>(this.baseUrl+'/add',body,httpOptions);
 }
 updateMember(mem:MemberResponse):Observable<MemberResponse>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(mem)
  return this._http.put<MemberResponse>(`${this.baseUrl}/edit/${mem._id}`,body,httpOptions);
  }
  deleteMember(id:string):Observable<any>{
      return this._http.delete(`${this.baseUrl}/${id}`);
    }
  
  getProgressByMember(id:string):Observable<any>{
    return this._http.get(`${this.baseUrl}/progress/${id}`);
  }

  addRoutine(idRoutine : string, idMember: string):Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    console.log(idRoutine);
    
    const body = JSON.stringify({
      "routine": idRoutine
    })
    return this._http.put(`${this.baseUrl}/edit/routine/${idMember}`,body,httpOptions);
    }
}
