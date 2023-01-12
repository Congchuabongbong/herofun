import {Component, OnInit} from '@angular/core';
import {PaymentService} from 'src/app/shared/services/payment.service';
import {PaymentSuccess} from "../../shared/entity/Modal";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  public paymentSuccess!: PaymentSuccess;

  constructor(private _paymentService: PaymentService) {
  }

  ngOnInit(): void {
    let orderId = localStorage.getItem("orderId") as string;
    let paymentChannelId = localStorage.getItem("paymentChannelId") as string;
    this.executeOder(orderId, paymentChannelId);
  }

  executeOder(orderId: string, paymentChannelId: string) {
    this._paymentService.executeOrder(orderId, paymentChannelId)
      .subscribe(paymentSuccess => paymentSuccess && (this.paymentSuccess = paymentSuccess.data));
  }

}
