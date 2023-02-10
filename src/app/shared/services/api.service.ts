import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError, mergeMap, of, delay } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { SystemUtil } from "../utils/SystemUtil";
import { Campaign, CampaignRequest } from "../entity/Modal";

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
      .get<any>(SystemUtil.BASE_URL + query);
  }






  public getCampaigns() {
    let query = `/api/v1/campaigns/all`;
    return this.http
      .get<any>(SystemUtil.BASE_URL + query);
  }

  public getSponsor() {
    return this.http
      .get<any>(SystemUtil.BASE_URL + '/api/v1/sponsors/all');
  }

  public getPageSponsor(offset: number, limit: number) {
    let url = `${SystemUtil.BASE_URL}/api/v1/sponsors?offset=${offset}&limit=${limit}`;
    return this.http
      .get<any>(url);
  }
  public getDetailSponsor(id: number) {
    let url = `${SystemUtil.BASE_URL}/api/v1/sponsors/detail?id=${id}`;
    return this.http
      .get<any>(url);
  }

  public getCategories() {
    return this.http
      .get<any>(SystemUtil.BASE_URL + '/api/v1/categories/active');
  }


  public getRandomCategories(random: number) {
    return this.http
      .get<any>(SystemUtil.BASE_URL + `/api/v1/categories/random?number=${random}`);
  }

  public getCampaignUrgent() {
    return this.http
      .get<Campaign>(SystemUtil.BASE_URL + `/api/v1/campaigns/urgent/random`);
  }

  public uploadImage(file: File) {
    let url = SystemUtil.BASE_URL + `/api/v1/files/upload`;
    let formData = new FormData();
    formData.append("file", file);
    return this.http
      .post<any>(url, formData)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next();
        })
      );
  }

  public createCampaign(request: CampaignRequest) {
    let url = SystemUtil.BASE_URL + `/api/v1/auth/campaign`;
    let headers = SystemUtil.setTokenHeader();
    return this.http.post<any>(url, JSON.stringify(request), { headers });
  }
}
