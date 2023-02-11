import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Transaction, TransactionModal} from "../../entity/Modal";

@Component({
  selector: 'app-list-sponsor',
  templateUrl: './list-sponsor.component.html',
  styleUrls: ['./list-sponsor.component.scss']
})
export class ListSponsorComponent implements OnInit {

  constructor(
    private _apiService: ApiService
  ) {
  }

  number = 10;

  @Input()
  idCampaign!: any;
  transaction!: TransactionModal[];
  transactionNew!: TransactionModal[];
  defaultImage = './assets/img/ic_avatar1.png';
  offsetTop = 1;
  offsetNew = 1;
  limit = 5;

  ngOnInit(): void {
    this.getPageTopTransactionByCampaignId(this.idCampaign, this.offsetTop, this.limit)
    this.getPageNewTransactionByCampaignId(this.idCampaign, this.offsetNew, this.limit)
  }

  getPageTopTransactionByCampaignId(id: any, offset: any, limit: any) {
    this._apiService.getPageTopTransactionByCampaignId(id, offset, limit)
      .subscribe(res => res && (this.transaction = res.items))
  }

  getPageNewTransactionByCampaignId(id: any, offset: any, limit: any) {
    this._apiService.getPageNewTransactionByCampaignId(id, offset, limit)
      .subscribe(res => res && (this.transactionNew = res.items))
  }

  handlerPhone(p: string) {
    if (!p) return '***********'
    let end = p.length;
    let result = p.slice(end - 3, end)
    let str = '';
    for (let i = 0; i < end - 3; i++) {
      str += '*'
    }
    str += result;
    return str;
  }

  loadMoreNew() {
    this.offsetNew++
    this._apiService.getPageNewTransactionByCampaignId(this.idCampaign, this.offsetNew, this.limit)
      .subscribe(res => res && (this.transactionNew.push(...res.items)))
  }

  loadMoreTop() {
    this.offsetTop++
    this._apiService.getPageTopTransactionByCampaignId(this.idCampaign, this.offsetTop, this.limit)
      .subscribe(res => res && (this.transaction.push(...res.items)))
  }
}
