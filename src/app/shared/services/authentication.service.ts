import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SystemUtil } from '../utils/SystemUtil';
import {Profile, User} from '../models';

let jwt = JSON.parse(localStorage.getItem('jwt')!);

const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + jwt?.accessToken,
  'content-type': 'application/json'
});
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('jwt')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string) {
    return this.http
      .post<any>(SystemUtil.BASE_URL + '/api/v1/auth/authenticate', {
        username,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('jwt', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  public register(user: User) {
    return this.http.post(SystemUtil.BASE_URL + '/api/v1/auth/sign-up', user);
  }

  public getProfile() {
    let url = `${SystemUtil.BASE_URL}/api/v1/auth/profile`
    return this.http.get<any>( url,{headers});
  }

  public logout() {
    localStorage.removeItem('jwt');
    this.currentUserSubject.next(null!);
  }
}
