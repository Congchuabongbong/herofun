import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, tap} from 'rxjs';
import {map} from 'rxjs/operators';

import {SystemUtil} from '../utils/SystemUtil';
import {User} from '../models';
import {FilterCampaign, FilterTransaction} from "../entity/Modal";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('jwt')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get RefreshData() {
    return this.refreshData;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string) {
    return this.http
      .post<any>(SystemUtil.BASE_URL + '/api/v1/auth/authenticate', {
        username,
        password,
      });
  }

  public register(user: User) {
    return this.http.post(SystemUtil.BASE_URL + '/api/v1/auth/sign-up', user);
  }

  public getProfile() {
    let headers = SystemUtil.setTokenHeader();
    let url = `${SystemUtil.BASE_URL}/api/v1/auth/profile`
    return this.http.get<any>(url, {headers});
  }

  public logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('profile');
    this.currentUserSubject.next(null!);
  }

  public findTransaction(filter: FilterTransaction) {
    let url = `${SystemUtil.BASE_URL}/api/v1/auth/transactions`;
    let headers = SystemUtil.setTokenHeader();
    return this.http.post<any>(url, JSON.stringify(filter), {headers})
      .pipe(tap(() => {
        this.RefreshData.next()
      }))
  }

  public saveProfile(profile: any) {
    let url = `${SystemUtil.BASE_URL}/api/v1/auth/profile`;
    let headers = SystemUtil.setTokenHeader();
    return this.http.post<any>(url, JSON.stringify(profile), {headers})
      .pipe(tap(() => {
        this.RefreshData.next()
      }))
  }

  public findCampaign(filter: FilterCampaign) {
    let url = `${SystemUtil.BASE_URL}/api/v1/auth/campaign/list`;
    let headers = SystemUtil.setTokenHeader();
    return this.http.post<any>(url, JSON.stringify(filter), {headers})
      .pipe(tap(() => {
        this.RefreshData.next()
      }))
  }
}
