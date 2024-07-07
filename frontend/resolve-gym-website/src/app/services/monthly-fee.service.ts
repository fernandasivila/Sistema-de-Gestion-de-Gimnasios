import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyFeeRequest, MonthlyFeeResponse } from '../models/monthly-fee';

@Injectable({
  providedIn: 'root'
})
export class MonthlyFeeService {

  private baseUrl='http://localhost:3000/monthlyFees'

  constructor(private _http: HttpClient) { }

  getAllMonthlyFees():Observable<MonthlyFeeResponse> {
    return this._http.get<MonthlyFeeResponse>(this.baseUrl+'/');
  }
  getMonthlyFeeById(id: String): Observable<MonthlyFeeResponse> {
    return this._http.get<MonthlyFeeResponse>(this.baseUrl+'/'+id);
  }
  addMonthlyFee(monthlyFee: MonthlyFeeRequest): Observable<MonthlyFeeRequest> {
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(monthlyFee)
    return this._http.post<MonthlyFeeRequest>(this.baseUrl+'/add', body, httpOptions);
  }
  deleteMonthlyFee(id: String): Observable<any> {
    return this._http.delete(this.baseUrl+'/'+id);
  }
  updateMonthlyFee(monthlyFee: MonthlyFeeResponse): Observable<MonthlyFeeResponse> {
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(monthlyFee)
    return this._http.post<MonthlyFeeResponse>(`${this.baseUrl}/edit/${monthlyFee._id}`, body, httpOptions)
  }

  getByMemeberId(idMember: string):Observable<MonthlyFeeResponse[]>{
    return this._http.get<MonthlyFeeResponse[]>(`${this.baseUrl}/getByMember/${idMember}`)
  }
  getDueByMemberId(idMember: string): Observable<MonthlyFeeResponse>{
    return this._http.get<MonthlyFeeResponse>(`${this.baseUrl}/due/${idMember}`)
  }

}
