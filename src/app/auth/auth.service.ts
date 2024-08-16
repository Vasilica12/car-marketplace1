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
  private token!: string | null;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken = () => {
    console.log("token from service" + this.token)
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
    this.http.post<{ token: string }>("http://localhost:3000/api/user/login", authData)
      .subscribe(responseData => {
        console.log(responseData);
        const token = responseData.token;
        this.token = token;
        if (token) {
          this.isAuth = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}