import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title-area',
  templateUrl: './page-title-area.component.html',
  styleUrls: ['./page-title-area.component.scss']
})
export class PageTitleAreaComponent implements OnInit {
  @Input() name!: string;
  constructor() { }

  ngOnInit(): void {

  }

}
