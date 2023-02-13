import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SystemUtil} from "../../utils/SystemUtil";

@Component({
  selector: 'donation-information',
  templateUrl: './donation-information.component.html',
  styleUrls: ['./donation-information.component.scss'],
})
export class DonationInformationComponent implements OnInit, OnChanges {
  @Input() target!: number;
  @Input() current!: number;
  @Input() leftTime!: number;
  @Input() donations!: number;
  @Input() payment!: number;
  @Input() endDate!: string;

  public achieve!: string;

  isDonate = false;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.achieve = ((changes['current'].currentValue / changes['target'].currentValue) * 100).toFixed(2) + '%';
    this.isDonate = this.checkDonate(this.endDate) >= 0;
    this.endDate = this.handlerDate(this.endDate)

  }

  ngOnInit(): void {

  }

  handlerDate(d: string) {
    let str = new Date(Date.parse(d))
    let date = str.getDate() < 10 ? `0${str.getDate()}` : str.getDate()
    let month = str.getMonth() < 10 ? `0${str.getMonth() + 1}` : str.getMonth()
    str.getHours() < 10 ? `0${str.getHours()}` : str.getHours();
    str.getMinutes() < 10 ? `0${str.getMinutes()}` : str.getMinutes();
    return `${date}/${month}/${str.getFullYear()}`
  }

  checkDonate(d: string) {
    let endDateCampaign = new Date(Date.parse(d)).setUTCHours(23, 59, 59, 999)
    let endCurrentDate = new Date().setUTCHours(23, 59, 59, 999)
    return endDateCampaign - endCurrentDate
  }


}
