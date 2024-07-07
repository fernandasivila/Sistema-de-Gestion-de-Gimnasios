import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentRecordRequest, PaymentRecordResponse } from '../models/payment-record';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentRecordService {
  private baseUrl='http://localhost:3000/paymentRecords'
  constructor(private _http: HttpClient) { }

  getAllPaymentRecord():Observable<PaymentRecordResponse[]>{
    return this._http.get<PaymentRecordResponse[]>(`${this.baseUrl}/`);
  }
  getPaymentRecordById(id: String): Observable<PaymentRecordResponse>{
    return this._http.get<PaymentRecordResponse>(`${this.baseUrl}/${id}`);
  }
  addPaymentRecord(paymentRecord: PaymentRecordRequest): Observable<PaymentRecordRequest>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(paymentRecord)
    
    return this._http.post<PaymentRecordRequest>(this.baseUrl+'/add', body, httpOptions);
  }
  deletePaymentRecord(id: String): Observable<any>{
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
  updatePaymentRecord(paymentRecord: PaymentRecordResponse): Observable<PaymentRecordResponse>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(paymentRecord)
    return this._http.put<PaymentRecordResponse>(`${this.baseUrl}/edit/${paymentRecord._id}`, body, httpOptions);
  }

}
