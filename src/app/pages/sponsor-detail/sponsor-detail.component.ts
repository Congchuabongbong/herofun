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
  templateUrl: './sponsor-detail.component.html',
  styleUrls: ['./sponsor-detail.component.scss']
})
export class SponsorDetailComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _fb: FormBuilder,
              private _paymentService: PaymentService,
              private _campaignService: CampaignService,
              private apiService: ApiService,
  ) {
  }
  sponsorDetail!: Sponsor;
  campaigns!: Campaign[];
  idSponsor: any;
  offsetSponsor = 1;
  limitSponsor = 6

  offsetCampaign = 1;
  limitCampaign = 3
  sponsor!: Sponsor[];

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      this._router.navigate(['/404', {message: "Vui lòng thử lại!"}])
    }
    this.idSponsor = id;
    this.getDetailSponsor();
    this.getSponsor();
    this.getCampaignBySponsorId()
  }

  getDetailSponsor() {
    this.apiService.getDetailSponsor(this.idSponsor)
      .subscribe(res => res && (this.sponsorDetail = res))
  }

  getCampaignBySponsorId() {
    this._campaignService.getCampaignBySponsorId(this.idSponsor, this.offsetCampaign, this.limitCampaign)
      .subscribe(res => res && (this.campaigns = res.items))
  }

  loadMore() {
    this.offsetSponsor++
    this._campaignService.getCampaignBySponsorId(this.idSponsor, this.offsetSponsor, this.limitSponsor)
      .subscribe(res => res && (this.campaigns.push(...res.items)))
  }

  getSponsor(){
    this.apiService.getPageSponsor(this.offsetSponsor, this.limitSponsor)
      .subscribe(res => res && (this.sponsor = res.items))
  }
}
