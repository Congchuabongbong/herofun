import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],

})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  onClickOnToTop() {
    $(".scroll-to-top").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 0);
      return false;
    });
  }
}
