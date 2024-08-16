import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class AuthService{
  private token!: string;

  constructor(private http: HttpClient) {}

  getToken = () => {
    console.log("token from service" + this.token)
    return this.token;
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
      });
  }
}