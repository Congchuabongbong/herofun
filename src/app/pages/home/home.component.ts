import {Component, OnInit, ViewChild} from '@angular/core';

declare var $: any;
// import Swiper core and required modules
import SwiperCore, {EffectFade, Parallax, Swiper, Virtual} from 'swiper';
import {SwiperComponent} from 'swiper/angular';
import {ApiService} from "../../shared/services/api.service";
import {Campaign, Sponsor} from "../../shared/entity/Modal";
// install Swiper modules
SwiperCore.use([Virtual]);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  @ViewChild('swiper', {static: false}) swiper!: SwiperComponent;

  constructor(private apiService: ApiService) {
  }

  limit: number = 6;
  offset: number = 1;
  campaigns: Campaign[] = [];
  sponsors: Sponsor[] = [];

  ngOnInit(): void {
    this.getCampaign();
    this.getSponsor();
  }

  getCampaign() {
    this.apiService.getPageCampaign(this.offset, this.limit).subscribe(
      res => this.campaigns = res.items,
      e => console.log(e)
    )
  }

  getSponsor() {
    this.apiService.getSponsor().subscribe(
      res => this.sponsors = res,
      e => console.log(e)
    )
  }

  slideNext() {
    this.swiper.swiperRef.slideNext(1000);

  }

  slidePrev() {
    this.swiper.swiperRef.slidePrev(1000);

  }

}
