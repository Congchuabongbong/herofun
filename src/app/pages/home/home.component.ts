import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
declare var $: any;
// import Swiper core and required modules
import SwiperCore, { EffectFade, Swiper, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { ApiService } from "../../shared/services/api.service";
import { Campaign, Sponsor } from "../../shared/entity/Modal";
import * as Parallax from 'parallax-js';
// install Swiper modules
SwiperCore.use([Virtual]);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;

  constructor(private apiService: ApiService, private _renderer: Renderer2, private _el: ElementRef) {
  }
  ngAfterViewInit(): void {

    const scenes = this._el.nativeElement.querySelectorAll('.scene');
    scenes.forEach((scene: HTMLElement) => {
      var parallaxInstance = new Parallax(scene, {
        relativeInput: true
      });
      parallaxInstance.friction(0.1, 0.1);
    });
  }

  limit: number = 3;
  offset: number = 1;
  campaigns: Campaign[] = [];
  public campaignUrgent!: Campaign;
  sponsors: Sponsor[] = [];

  ngOnInit(): void {
    this.getCampaign();
    this.getCampaignUrgent();
    this.getSponsor();
  }

  getCampaign() {
    this.apiService.getPageCampaign(this.offset, this.limit).subscribe(
      res => this.campaigns = res.items,
      e => console.log(e)
    );
  }

  getCampaignUrgent() {
    this.apiService.getCampaignUrgent().subscribe(campaignUrgent => campaignUrgent && (this.campaignUrgent = campaignUrgent));
  }
  getSponsor() {
    this.apiService.getSponsor().subscribe(
      res => this.sponsors = res,
      e => console.log(e)
    );
  }

  slideNext() {
    this.swiper.swiperRef.slideNext(1000);

  }

  slidePrev() {
    this.swiper.swiperRef.slidePrev(1000);

  }

}
