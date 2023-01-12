import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder, ITransaction } from '../entity/Modal';
import { SystemUtil } from '../utils/SystemUtil';

const headers: HttpHeaders = new HttpHeaders({

  'content-type': 'application/json',
  // 'returnUrl': 'http://localhost:4200/payment-success',
  'returnUrl': 'https://herofun-client.vercel.app/payment-success',
  'cancelUrl': 'https://dev110521.service-now.com/sp'
});
@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  constructor(private _http: HttpClient) { }


  public createDonate(paymentInfo: ITransaction): Observable<IOrder> {
    const url = SystemUtil.BASE_URL + '/api/v1/payments/paypal';
    return this._http.post<any>(url, paymentInfo, {
      headers: headers,
    });
  }

  public executeOrder(orderId: string, paymentChannelId: string): Observable<IOrder> {
    const url = SystemUtil.BASE_URL + `/api/v1/payments/paypal/execute?payId=${orderId}&paymentChannelId=${paymentChannelId}`;
    return this._http.post<any>(url, {}, {
      headers: headers,
    });
  }

}
