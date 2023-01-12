import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SystemUtil } from "../utils/SystemUtil";

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
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next();
        })
      );
  }
  public getCampaigns() {
    let query = `/api/v1/campaigns/all`;
    return this.http
      .get<any>(SystemUtil.BASE_URL + query)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next();
        })
      );
  }

  public getSponsor() {
    return this.http
      .get<any>(SystemUtil.BASE_URL + '/api/v1/sponsors')
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next();
        })
      );
  }

  public getRandomCategories(random : number) {
    return this.http
      .get<any>(SystemUtil.BASE_URL + `/api/v1/categories/random?number=${random}`)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next();
        })
      );
  }

  public getCampaignUrgent() {
    return this.http
      .get<any>(SystemUtil.BASE_URL + `/api/v1/campaigns/urgent`)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next();
        })
      );
  }
}
