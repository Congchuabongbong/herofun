import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SystemUtil } from "../utils/SystemUtil";
import {Campaign} from "../entity/Modal";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {

  }

  get RefreshData() {
    return this.refreshData;
  }

  public getPageCampaign(offset: number, limit: number) {
    let query = `/api/v1/campaigns?offset=${offset}&limit=${limit}`;
    return this.http
      .get<any>(SystemUtil.BASE_URL + query)
  }
  public getCampaigns() {
    let query = `/api/v1/campaigns/all`;
    return this.http
      .get<any>(SystemUtil.BASE_URL + query)
  }

  public getSponsor() {
    return this.http
      .get<any>(SystemUtil.BASE_URL + '/api/v1/sponsors')
  }
  public getCategories() {
    return this.http
      .get<any>(SystemUtil.BASE_URL + '/api/v1/categories/active')
  }


  public getRandomCategories(random : number) {
    return this.http
      .get<any>(SystemUtil.BASE_URL + `/api/v1/categories/random?number=${random}`)
  }

  public getCampaignUrgent() {
    return this.http
      .get<Campaign>(SystemUtil.BASE_URL + `/api/v1/campaigns/urgent/random`)
  }
}
