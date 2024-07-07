import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackRequest, FeedbackResponse } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl='http://localhost:3000/feedbacks'

  constructor(private _http: HttpClient) { }

 getAllFeedbacks():Observable<FeedbackResponse[]>{
  return this._http.get<FeedbackResponse[]>(this.baseUrl+'/')
 }
  getFeedbackById(id: string):Observable<FeedbackResponse>{
  return this._http.get<FeedbackResponse>(this.baseUrl+'/'+id)
 }
  addFeedback(feedback: FeedbackRequest): Observable<FeedbackRequest>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(feedback)
  return this._http.post<FeedbackRequest>(this.baseUrl+'/add', body, httpOptions)
 }
  deleteFeedback(id: string): Observable<any>{
    return this._http.delete<any>(this.baseUrl+'/'+id)
 }
  updateFeedback(feedback: FeedbackResponse): Observable<FeedbackResponse>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(feedback)
    return this._http.put<FeedbackResponse>(this.baseUrl+'/edit/'+feedback._id, body, httpOptions)
  }

}
