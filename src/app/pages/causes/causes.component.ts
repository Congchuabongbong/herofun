import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Campaign, Sponsor} from "../../shared/entity/Modal";

@Component({
  selector: 'app-causes',
  templateUrl: './causes.component.html',
  styleUrls: ['./causes.component.scss'],

})
export class CausesComponent implements OnInit {

  campaigns: Campaign[] = [];
  sponsors: Sponsor[] = [];
  limit: number = 6;
  offset: number = 1;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getPageCampaign();
    this.getSponsor();
  }

  getPageCampaign() {
    this.apiService.getPageCampaign(this.offset, this.limit)
      .subscribe(res => this.campaigns = res.items)
  }

  getSponsor() {
    this.apiService.getSponsor().subscribe(
      res => this.sponsors = res,
      e => console.log(e)
    )
  }

}
