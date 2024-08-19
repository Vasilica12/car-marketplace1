import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class AuthService{
  private isAuth = false;
  private token!: any;
  private tokenTimer!: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken = () => {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{message: string, result: string}>("http://localhost:3000/api/user/signup", authData)
      .subscribe(responseData => {
        console.log(responseData);
      })
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/login", authData)
      .subscribe(responseData => {
        const token = responseData.token;
        this.token = token;
        if (token) {
          const expires = responseData.expiresIn;
          this.setAuthTimer(expires);
          this.isAuth = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expires * 1000);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation?.token;
      console.log("token in autoAuthUser " + this.token);
      this.isAuth = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', expirationDate.toISOString());
    }
  }

  private clearAuthData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
    }
  }

  private getAuthData() {
    if (typeof window === 'undefined') {
      return null;
    }

    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if(!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}