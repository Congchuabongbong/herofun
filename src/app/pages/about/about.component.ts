import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],

})
export class AboutComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    // Background Image
    $("[data-bg-img]").each(function () {
      $(this).css("background-image", "url(" + $(this).data("bg-img") + ")");
    });
    // Background Color
    $("[data-bg-color]").each(function () {
      $(this).css("background-color", $(this).data("bg-color"));
    });

  }

}
