import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PaymentService } from "../../shared/services/payment.service";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { Campaign, Sponsor } from "../../shared/entity/Modal";
import { CampaignService } from "../../shared/services/campaign.service";
import { ApiService } from "../../shared/services/api.service";
import { SystemUtil } from "../../shared/utils/SystemUtil";
import { Observable, mergeMap, of } from 'rxjs';

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
  campaigns: Observable<Campaign[]> = this.apiService.getPageCampaign(1, 2).pipe(mergeMap((result) => of(result['items'])));
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.getSponsor();

  }

  getSponsor() {
    this.apiService.getPageSponsor(this.offset, this.limit)
      .subscribe(res => {
        res && (this.sponsor = res.items)
        this.isLoading = false;
      });
  }


  loadMore() {
    this.offset++;
    this.isLoading = true;
    this.apiService.getPageSponsor(this.offset, this.limit)
      .subscribe(res => {
        res && (this.sponsor.push(...res.items));
        this.isLoading = false;
      });
  }

  handlerDateTime(s: string) {
    return SystemUtil.handlerDateTime(s);
  }
}
