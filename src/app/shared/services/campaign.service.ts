import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject, tap} from 'rxjs';
import {Campaign} from '../entity/Modal';
import {SystemUtil} from '../utils/SystemUtil';

const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + "token",
  'content-type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})

export class CampaignService {
  private campaignDetailSubject: Subject<Campaign> = new Subject<Campaign>();
  public campaigns$ = this._http.get<Campaign[]>(SystemUtil.BASE_URL + '/api/v1/campaigns/all');
  public campaignDetailAction$ = this.campaignDetailSubject.asObservable();
  private refreshData = new Subject<void>();

  get RefreshData() {
    return this.refreshData;
  }

  constructor(private _http: HttpClient) {
  }

  public getPageCampaign(id: any) {
    let query = `/api/v1/campaigns/detail?id=${id}`;
    return this._http
      .get<any>(SystemUtil.BASE_URL + query)
      .pipe(
        tap(() => {
          this.RefreshData.next()
        })
      );
    ;
  }

  public searchCampaign(category: any, keyword: any, offset: any, limit: any) {
    let url = `${SystemUtil.BASE_URL}/api/v1/campaigns/search?category=${category}&keyword=${keyword}&offset=${offset}&limit=${limit}`;
    return this._http.get<any>(url)
      .pipe(
        tap(() => {
          this.RefreshData.next()
        })
      );
  }
}
