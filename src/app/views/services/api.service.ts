import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/model';
import { AppConfigService } from './app-config.service';

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
  private apiBaseUrl: string;
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService)
    {
      this.apiBaseUrl = appConfigService.apiBaseUrl;
    }

  getItems(): Observable<any> {
    return this.http.get(`${ this.apiBaseUrl }payment-details`, httpOptions);
  }

  requestPayment(card: Card): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(card);
    return this.http.post(`${ this.apiBaseUrl }payment/request-payment/`, body,{'headers':headers})
  }

}