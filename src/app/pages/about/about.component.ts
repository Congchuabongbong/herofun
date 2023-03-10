import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import Swiper from 'swiper';
import {SwiperComponent} from 'swiper/angular';
import {ApiService} from "../../shared/services/api.service";
import {Sponsor} from "../../shared/entity/Modal";

declare var $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],

})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('swiper', {static: false}) swiper!: SwiperComponent;

  constructor(private apiService: ApiService) {
  }

  ngAfterViewInit(): void {
    var teamSlider = new Swiper(".team-slider-container", {
      slidesPerView: 3,
      loop: true,
      spaceBetween: 30,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        1200: {
          slidesPerView: 3,
        },

        992: {
          slidesPerView: 3,
        },

        768: {
          slidesPerView: 2,
        },

        576: {
          slidesPerView: 2,
        },

        0: {
          slidesPerView: 1,
        },
      },
    });

    // Background Image
    $("[data-bg-img]").each(function () {
      $(this).css("background-image", "url(" + $(this).data("bg-img") + ")");
    });
    // Background Color
    $("[data-bg-color]").each(function () {
      $(this).css("background-color", $(this).data("bg-color"));
    });

  }

  sponsor!: Sponsor[];

  ngOnInit(): void {
    this.apiService.getPageSponsor(1,10).subscribe(res => res && (this.sponsor = res.items))
  }

  slideNext() {
    this.swiper.swiperRef.slideNext(1000);

  }

  slidePrev() {
    this.swiper.swiperRef.slidePrev(1000);

  }
}
