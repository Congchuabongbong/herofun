import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "../../shared/services/payment.service";

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  public paymentInfo!: FormGroup;
  public idCampaign!: string;
  constructor(private _route: ActivatedRoute,
              private _router: Router, private _fb: FormBuilder,
              private _paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      //redirect not 404 found
      this._router.navigate(['/home']);
      return;
    }
    this.idCampaign = id;
  }

  submitDonate() {
    this.paymentInfo = this._fb.group({
      senderName: ['NGUYEN HS'],
      message: ['ủng hộ em Kiên mau chóng chữa khỏi bệnh ngáo chó nhé. '],
      amount: [2000],
      campaignId: this.idCampaign,
      paymentChannel: [1],
      anonymous: [false],
    });
    this.createPaymentDonate();
  }

  createPaymentDonate() {
    this._paymentService.createDonate(this.paymentInfo.getRawValue()).subscribe((data) => {
      console.log(data);
      localStorage.setItem("orderId", data.data.orderId);
      localStorage.setItem("paymentChannelId", data.data.paymentChannel.toString());
      window.open(data.data.link.href);
    });
  }

}
