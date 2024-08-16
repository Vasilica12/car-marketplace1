import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";

@Injectable({
  providedIn: 'root',
})

export class AuthService{

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{message: string, result: string}>("http://localhost:3000/api/user/signup", authData)
      .subscribe(responseData => {
        console.log(responseData);
      })
  }
}