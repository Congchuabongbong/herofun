import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SystemUtil} from "../utils/SystemUtil";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
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

  private refreshData = new Subject<void>();

  get RefreshData() {
    return this.refreshData;
  }

  public getPageArticleByCampaignId(id: any, offset: number, limit: number): Observable<any> {
    let query = `${SystemUtil.BASE_URL}/api/v1/articles?offset=${offset}&limit=${limit}&campaignId=${id}`;
    return this._http.get<any>(query)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next();
        })
      );
  }

  public getArticleDetail(id: any){
    let query = `${SystemUtil.BASE_URL}/api/v1/articles/detail?id=${id}`;
    return this._http.get<any>(query);
  }

  public getThreeAnotherArticleByIdAndCampaignId(id: any, articleId: any){
    let query = `${SystemUtil.BASE_URL}/api/v1/articles/another?campaignId=${id}&articleId=${articleId}`;
    return this._http.get<any>(query);
  }

}


