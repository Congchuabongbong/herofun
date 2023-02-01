import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { Campaign, Category } from '../../shared/entity/Modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentService } from 'src/app/shared/services/payment.service';
import {SystemUtil} from "../../shared/utils/SystemUtil";

@Component({
  selector: 'app-cause-detail',
  templateUrl: './cause-detail.component.html',
  styleUrls: ['./cause-detail.component.scss']
})
export class CauseDetailComponent implements OnInit {
  constructor(private _route: ActivatedRoute,
    private _campaignService: CampaignService,
    private _router: Router, private _fb: FormBuilder,
    private _apiService: ApiService
    ) {
  }

  public campaign!: Campaign;

  public random: number = 5;
  public categories: Category[] = [];
  public campaignUrgent!: Campaign;
  public idCampaign!: string;

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      //redirect not 404 found
      this._router.navigate(['/home']);
      return;
    }
    this.idCampaign = id;
    this._campaignService.getDetailCampaign(id).pipe().subscribe((campaign) => {
      console.log(campaign)
      campaign && (this.campaign = campaign);
    });

    this.getRandomCategory();
    this.getCampaignUrgent();
  }

  getRandomCategory() {
    this._apiService.getRandomCategories(this.random).subscribe(res => this.categories = res);
  }

  getCampaignUrgent() {
    this._apiService.getCampaignUrgent().subscribe(campaignUrgent => campaignUrgent && (this.campaignUrgent = campaignUrgent));
  }


  handlerDateTime(s: string) {
    return SystemUtil.handlerDateTime(s);
  }
}
