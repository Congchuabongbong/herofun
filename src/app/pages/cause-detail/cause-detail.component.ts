import { from, map, mergeMap, of, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { filter, find, take } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { Campaign } from '../../shared/entity/Modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-cause-detail',
  templateUrl: './cause-detail.component.html',
  styleUrls: ['./cause-detail.component.scss']
})
export class CauseDetailComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _campaignService: CampaignService, private _router: Router, private _fb: FormBuilder, private _paymentService: PaymentService) { }
  public campaign!: Campaign;
  public paymentInfo!: FormGroup;
  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      //redirect not 404 found
      this._router.navigate(['/home']);
    }
    this._campaignService.getPageCampaign(id).pipe().subscribe((campaign) => {
      campaign && (this.campaign = campaign);
      if (campaign) {
        //do something
      }
    });

    this.paymentInfo = this._fb.group({
      senderName: ['NGUYEN HS'],
      message: ['ủng hộ em Kiên mau chóng chữa khỏi bệnh ngáo chó nhé. '],
      amount: [2000],
      campaignId: [2],
      paymentChannel: [1],
      anonymous: [false],
    });


    this._paymentService.createTransaction(this.paymentInfo.getRawValue()).subscribe((data) => {
      localStorage.setItem("orderId", data.data.orderId);
      localStorage.setItem("paymentChannelId", data.data.paymentChannel.toString());
      window.open(data.data.link.href);
    });
  }

}
