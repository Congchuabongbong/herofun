import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'donation-information',
  templateUrl: './donation-information.component.html',
  styleUrls: ['./donation-information.component.scss'],
})
export class DonationInformationComponent implements OnInit {
  @Input() target!: number;
  @Input() current!: number;
  @Input() leftTime!: number;
  @Input() donations!: number;
  @Input() payment!: number;

  public achieve!: string;

  constructor() {}

  ngOnInit(): void {
    this.achieve = ((this.current / this.target) * 100).toFixed(2) + '%';
  }
}
