import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { error } from "console";

@Injectable({
  providedIn: 'root',
})

export class AuthService{
  private isAuth = false;
  private token!: any;
  private userId!: any;
  private errorMessage!: any;
  private tokenTimer!: any;
  private firstName = new Subject<string>();
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken = () => {
    return this.token;
  }

  getFirstName() {
    return this.firstName.asObservable();
  }

  getError() {
    return this.errorMessage;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(firstName: string, secondName: string, email: string, password: string) {
    const authData: AuthData = {
      firstName: firstName, 
      secondName: secondName, 
      email: email, 
      password: password
    };
    
    return this.http.post<{message: string, result: string}>("http://localhost:3000/api/user/signup", authData)
      .subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(['/']);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  login(email: string, password: string) {
    const authData: any = {
      email: email, 
      password: password
    };

    this.http.post<{ token: string, expiresIn: number, userId: string, email: string, firstName: string}>("http://localhost:3000/api/user/login", authData)
      .subscribe(responseData => {
        const token = responseData.token;
        console.log("Data after login: " + responseData.firstName);
        this.token = token;
        if (token) {
          const expires = responseData.expiresIn;
          this.setAuthTimer(expires);
          this.isAuth = true;
          this.userId = responseData.userId;
          this.authStatusListener.next(true);
          this.firstName.next(responseData.firstName);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expires * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
        this.authStatusListener.next(false);
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
      this.userId = authInformation.userId;
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
    this.userId = null;
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', expirationDate.toISOString());
      localStorage.setItem('userId', userId);
    }
  }

  private clearAuthData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('userId');
    }
  }

  private getAuthData() {
    if (typeof window === 'undefined') {
      return null;
    }

    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if(!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}