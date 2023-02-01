import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "../../shared/services/payment.service";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Campaign, Sponsor} from "../../shared/entity/Modal";
import {CampaignService} from "../../shared/services/campaign.service";
import {ApiService} from "../../shared/services/api.service";

@Component({
  selector: 'app-payment-form',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {


  constructor(private _route: ActivatedRoute,
              private _router: Router, private _fb: FormBuilder,
              private _paymentService: PaymentService,
              private _campaignService: CampaignService,
              private apiService: ApiService,
              private authService: AuthenticationService,
  ) {
  }

  offset = 1;
  limit = 12;
  sponsor!: Sponsor[];
  campaigns!: Campaign[];

  ngOnInit(): void {
    this.getSponsor()
    this.getCampaign()
  }

  getSponsor(){
    this.apiService.getPageSponsor(this.offset, this.limit)
      .subscribe(res => res && (this.sponsor = res.items))
  }

  getCampaign(){
    this.apiService.getPageCampaign(1,3)
      .subscribe(res => res && (this.campaigns = res.items))
  }

  loadMore() {
    this.offset++
    this.apiService.getPageSponsor(this.offset, this.limit)
      .subscribe(res => res && (this.sponsor.push(...res.items)))
  }
}
