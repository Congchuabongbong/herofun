import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private _paymentService: PaymentService) { }

  ngOnInit(): void {
    this._paymentService.executeOrder(localStorage.getItem("orderId") as string, localStorage.getItem("paymentChannelId") as string).subscribe(res => console.log(res));
  }

}
