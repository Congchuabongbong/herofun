import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SystemUtil} from "../utils/SystemUtil";
import {catchError, Subject, tap, throwError} from "rxjs";

new HttpHeaders({
  Authorization: 'Bearer ' + "token",
  'content-type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  constructor(private _http: HttpClient) {
  }
  private refreshData = new Subject<void>();

  get RefreshData() {
    return this.refreshData;
  }

  public getCommentByArticleId(id: any, offset: number, limit: number) {
    let query = `${SystemUtil.BASE_URL}/api/v1/comments/article/${id}?offset=${offset}&limit=${limit}`;
    return this._http.get<any>(query)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next();
        })
      );;
  }

  public postComment(articleId: any, content: string) {
    let headers = SystemUtil.setTokenHeader();
    let query = `${SystemUtil.BASE_URL}/api/v1/comments`;
    let body = {
      content: content,
      articleId: articleId
    }
    return this._http.post<any>(query, JSON.stringify(body), {headers})
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
