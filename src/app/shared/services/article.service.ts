import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {SystemUtil} from "../utils/SystemUtil";
new HttpHeaders({
  Authorization: 'Bearer ' + "token",
  'content-type': 'application/json'
});
@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  constructor(private _http: HttpClient) {
  }

  public getPageArticleByCampaignId(id: any, offset: number, limit: number) {
    let query = `${SystemUtil.BASE_URL}/api/v1/articles?offset=${offset}&limit=${limit}&campaignId=${id}`;
    return this._http
      .get<any>(query);
  }

}
