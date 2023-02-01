import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Campaign, Category, Sponsor} from "../../shared/entity/Modal";
import {CampaignService} from "../../shared/services/campaign.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SystemUtil} from "../../shared/utils/SystemUtil";

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.scss'],

})
export class CausesComponent implements OnInit {

  campaigns: Campaign[] = [];
  sponsors: Sponsor[] = [];
  categories: Category[] = [];
  limit: number = 6;
  offset: number = 1;

  category: number = 0;
  keyword?: string = "";
  categoryId?: string;

  constructor(private apiService: ApiService,
              private campaignService: CampaignService,
              private activeRouter: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(param => this.categoryId = param['categoryId'])
    if (this.categoryId){
      this.category = parseInt(this.categoryId)
      this.searchCampaign();
    }else {
      this.getPageCampaign();
    }

    this.getSponsor();
    this.getCategories();
  }



  getPageCampaign() {
    this.apiService.getPageCampaign(this.offset, this.limit)
      .subscribe(res => this.campaigns = res.items)
  }

  getSponsor() {
    this.apiService.getSponsor().subscribe(
      res => this.sponsors = res,
    )
  }

  searchCampaign() {
    this.campaignService.searchCampaign(this.category, this.keyword, this.offset, this.limit)
      .subscribe(res => {
        this.campaigns = res.items;
      })
  }

  private getCategories() {
    this.apiService.getCategories().subscribe(res => this.categories = res)
  }

  changeCategories($event: any) {
    this.category = $event.target.value;

  }

  btnSearch() {
    this.searchCampaign();
  }

  reset() {
    this.category = 0;
    this.keyword = "";
    this.getPageCampaign();
  }

  handlerDateTime(date: string) {
    return SystemUtil.handlerDateTime(date)
  }
}
