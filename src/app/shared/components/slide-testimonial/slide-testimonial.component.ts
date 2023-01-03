import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-slide-testimonial',
  templateUrl: './slide-testimonial.component.html',
  styleUrls: ['./slide-testimonial.component.scss']
})
export class SlideTestimonialComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;
  constructor() { }

  ngOnInit(): void {

  }
  slideNext() {
    this.swiper.swiperRef.slideNext(1000);

  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev(1000);

  }

}
