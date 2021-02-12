import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  UsernameAvailableResponse,
  SignupCredentials,
  SignupResponse,
  AuthenticatedResponse,
  SigninCredentials,
  SigninResponse,
} from 'src/assets/types/AuthTypes';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_PATH = 'https://api.angular-email.com';
  signedin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  username = '';

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    const requestBody = { username };

    return this.http.post<UsernameAvailableResponse>(
      `${this.BASE_PATH}/auth/username`,
      requestBody
    );
  }

  signup(signupProps: SignupCredentials): Observable<SignupResponse> {
    return this.http
      .post<SignupResponse>(`${this.BASE_PATH}/auth/signup`, signupProps)
      .pipe(
        tap((res) => {
          this.signedin$.next(true);
          this.username = res.username;
        })
      );
  }

  signout() {
    return this.http.post(`${this.BASE_PATH}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
        this.username = '';
      })
    );
  }

  signin(signinCredentials: SigninCredentials) {
    return this.http
      .post<SigninResponse>(`${this.BASE_PATH}/auth/signin`, signinCredentials)
      .pipe(
        tap((res) => {
          this.signedin$.next(true);
          this.username = res.username;
        })
      );
  }

  checkAuth(): Observable<AuthenticatedResponse> {
    return this.http
      .get<AuthenticatedResponse>(`${this.BASE_PATH}/auth/signedin`)
      .pipe(
        tap((res: AuthenticatedResponse) => {
          this.signedin$.next(res.authenticated);
          this.username = res.username;
        })
      );
  }
}
