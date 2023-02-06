import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, loginData } from '../interface/data';
import { environment } from '../../environments/environment'; 
import { Router } from '@angular/router';

const API_LOGIN_URL = `${environment._loginUrl}/oauth/token/pin`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  constructor(
    private http: HttpClient,
    private router:Router){}

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(environment.Username +  ':' + environment.Password),
    }),
  };

  // private static generateHeaders(): { headers: HttpHeaders } {
  //   return {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Authorization:
  //         'Basic ' + btoa(environment.Username + ':' + environment.Password),
  //     }),
  //   };
  // }

  // registerUser(User: Data) {
  //   return this.http.post<any>(environment._registerUrl, User, {
  //     observe: 'response',
  //   });
  // }

 loginUser(userLogin: any) {
    return this.http.post<any>(API_LOGIN_URL, userLogin, this.headers);
  }

 getToken(){
    return localStorage.getItem('access_token');
  }

 storedToken(tokenValue: string){
    localStorage.setItem('access_token', tokenValue);
  }

 isLoggedIn():boolean{
    return !!localStorage.getItem('access_token')
  }

logOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
  requestOtp(Otp: any) {
    return this.http.get<any>(
      `https://cryptopesa.herokuapp.com/CryptoApp/Onboard/confirm?code=${Otp}`
    );
  }

 
 
}
