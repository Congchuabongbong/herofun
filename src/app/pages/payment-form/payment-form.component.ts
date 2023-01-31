import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "../../shared/services/payment.service";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {FormDonateRequest} from "../../shared/entity/Modal";
import {CampaignService} from "../../shared/services/campaign.service";

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  validateFormDonate = {
    hiddenErrorAmount: true,
    hiddenErrorSenderName: true,
    hiddenErrorPhone: true,
    hiddenErrorAddress: true,
    hiddenErrorEmail: true,
    hiddenErrorMessage: true,
  };
  formDonate = new FormDonateRequest();
  public paymentInfo!: FormGroup;
  public idCampaign!: string;

  constructor(private _route: ActivatedRoute,
              private _router: Router, private _fb: FormBuilder,
              private _paymentService: PaymentService,
              private _campaignService: CampaignService,
              private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');

    if (!id) {
      //redirect not 404 found
      this._router.navigate(['/home']).then((r) => console.log(r));
      return;
    }
    this._campaignService.getDetailCampaign(id).subscribe(
      res => console.log(res),
      error => this._router.navigate(['/404',{message: error && error.message}])
        .then((r) => console.log(r))
    )
    this.getProfile();
    this.idCampaign = id;

  }

  createPaymentDonate() {
    this._paymentService.createDonate(this.formDonate).subscribe((data) => {
      localStorage.setItem("orderId", data.data.orderId);
      localStorage.setItem("paymentChannelId", data.data.paymentChannel.toString());
      window.open(data.data.link.href);
    });
  }

  getProfile() {
    this.authService.getProfile().subscribe(res => {
      if (res && res.data) {
        this.convertResponseProfileToFormDonate(res.data);
      }
      console.log(this.formDonate)
    })
  }

  convertResponseProfileToFormDonate(data: any): void {
    this.formDonate.address = data && data.address;
    this.formDonate.phone = data && data.phone;
    this.formDonate.senderName = data && (data.firstName + ' ' + data.lastName);
    this.formDonate.email = data && data.email;
  }

  btnDonate() {
    this.validateFormDonateRequest()
    this.formDonate.campaignId = parseInt(this.idCampaign);
    this.formDonate.paymentChannel = 1
    this.createPaymentDonate();
  }

  validateFormDonateRequest() {
    this.validateFormDonate.hiddenErrorAmount = this.formDonate.amount > 0;
    this.validateFormDonate.hiddenErrorSenderName = !!this.formDonate.senderName;
    this.validateFormDonate.hiddenErrorEmail = !!this.formDonate.email;
    this.validateFormDonate.hiddenErrorPhone = !!this.formDonate.phone;
    this.validateFormDonate.hiddenErrorAddress = !!this.formDonate.address;
    this.validateFormDonate.hiddenErrorMessage = !!this.formDonate.message;
  }
}
