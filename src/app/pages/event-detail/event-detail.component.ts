import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var skillsBar = $(".progress-bar-line");

    skillsBar.appear(function () {
      skillsBar.each(function (index: any, elem: any) {
        var elementItem = $(elem),
          skillBarAmount = elementItem.data("percent");
        elementItem.animate({ width: skillBarAmount }, 800);
        elementItem
          .closest(".progress-item")
          .find(".percent")
          .text(skillBarAmount);
      });
    });
    var chartSelector = $(".pie-chart-circle");
    // chartSelector.each(function () {
    //   $(this).appear(function () {
    //     var $this = $(this),
    //       amount =
    //         '<span class="skill-percent">' + $this.data("percent") + "%</span>";
    //     $this.html(amount);
    //     $this.easyPieChart({
    //       trackColor: $this.data("track-color"),
    //       lineCap: $this.data("line-cap"),
    //       scaleColor: false,
    //       lineWidth: $this.data("line-width"),
    //     });
    //   });
    // });
  }

}
