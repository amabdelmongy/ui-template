import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/model';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get("http://localhost:55794/api/v1/payment-details", httpOptions);
  }

  requestPayment(card: Card): Observable<any> {
    console.log(card);
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(card);
    return this.http.post("http://localhost:55794/api/v1/payment/request-payment/", body,{'headers':headers})
  }

}