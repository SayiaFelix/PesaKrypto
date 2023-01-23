import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, loginData } from '../interface/data';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  registerUser(User: Data) {
    return this.http.post<any>(environment._registerUrl, User, {
      observe: 'response',
    });
  }

  // requestOtp(Otp: any) {
  //   return this.http.get<any>(
  //     `https://cryptopesa.herokuapp.com/CryptoApp/Onboard/confirm?code=${Otp}`
  //   );
  // }

  loginUser(userLogin: loginData) {
    return this.http.post<any>(environment._loginUrl, userLogin, {
      observe: 'response',
    });
  }
}