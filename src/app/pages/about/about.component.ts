import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { SwiperComponent } from 'swiper/angular';
declare var $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],

})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;
  constructor() { }
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
  ngOnInit(): void {
  }
  slideNext() {
    this.swiper.swiperRef.slideNext(1000);

  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev(1000);

  }
}
