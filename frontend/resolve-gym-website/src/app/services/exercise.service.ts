import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseRequest, ExerciseResponse } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private baseUrl='http://localhost:3000/exercises'

  constructor(private _http:HttpClient) { }

  getAllExercises():Observable<ExerciseResponse[]>{
    return this._http.get<ExerciseResponse[]>(this.baseUrl+'/');
  }
  getExerciseById(id:String):Observable<ExerciseResponse>{
    return this._http.get<ExerciseResponse>(`${this.baseUrl}/${id}`);
  }
  addExercise(exercise:ExerciseRequest):Observable<ExerciseRequest>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(exercise)
    return this._http.post<ExerciseRequest>(this.baseUrl+'/add', body, httpOptions);
  }
  deleteExercise(id:String):Observable<any>{
    return this._http.delete<any>(`${this.baseUrl}/${id}`);
  }
  updateExercise( exercise:ExerciseResponse):Observable<ExerciseResponse>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(exercise)
    return this._http.post<ExerciseResponse>(`${this.baseUrl}/edit/${exercise._id}`,body,httpOptions)
  }

}
