import { Injectable } from '@angular/core';
import {catchError, Subject, tap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SystemUtil} from "../utils/SystemUtil";

const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + "token",
  'content-type': 'application/json'
});

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

  getPageCampaign(offset: number, limit: number) {
    let query = `/api/v1/campaigns?offset=${offset}&limit=${limit}`;
    return this.http
      .get<any>(SystemUtil.BASE_URL + query)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(()=>{
          this.RefreshData.next()
        })
      );
  }

  getSponsor(){
    return this.http
      .get<any>(SystemUtil.BASE_URL + '/api/v1/sponsors')
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(()=>{
          this.RefreshData.next()
        })
      );
  }
}
