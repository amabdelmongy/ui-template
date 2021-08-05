import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { mockCards } from '../models/mock.card';

@Injectable()
export class HttpRequestInterceptorMock implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler):
              Observable<HttpEvent<any>> {
        if (request.url){
            console.log('Intercepted httpCall' + request.url);
            if(request.url.indexOf(`payment/payment-details`) > -1) {
                return of(new HttpResponse({ status: 200, body: mockCards }));
            } else if (request.url.indexOf('payment/request-payment/') > -1) {
                return of(new HttpResponse({ status: 200, body: "saved" }));
            }
        }
        return next.handle(request);
    }
}